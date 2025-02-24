'use client';
import { NaverReverseGeocodeRes } from '@/app/types/map';
import Script from 'next/script';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type NaverMapClickEvent = {
  coord: naver.maps.LatLng;
  type: 'click';
};

type NaverMapProps = {
  mapOptions?: naver.maps.MapOptions;
  mapId: string;
  // onClickMap?: (e: NaverMapClickEvent) => void;
};

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationPositionError) */
type MinifiedGeolocationPositionError = {
  code: number;
  message: string;
};

type NaverMapContextProps = {
  mapRef: React.RefObject<naver.maps.Map | null>;
  isInitialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCallbackRef: React.RefObject<
    ((e: NaverMapClickEvent, map: naver.maps.Map) => void) | null
  >;
  mapId: string;
  clickedCoord?: naver.maps.LatLng | null;
  setClickedCoord?: React.Dispatch<
    React.SetStateAction<naver.maps.LatLng | null>
  >;
  geolocationPermissionError?: MinifiedGeolocationPositionError | null;
  setGeolocationPermissionError?: React.Dispatch<
    React.SetStateAction<MinifiedGeolocationPositionError | null>
  >;
};

const NaverMapContext = React.createContext<NaverMapContextProps | null>(null);

export function useNaverMap() {
  const mapContext = React.useContext(NaverMapContext);

  if (!mapContext) {
    throw new Error('useNaverMap must be used within a <NaverMapProvider />');
  }

  return mapContext;
}

export const searchCoordinateToAddress = (
  coords: naver.maps.LatLng,
): Promise<NaverReverseGeocodeRes> => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: coords,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      },
      (status: naver.maps.Service.Status, res: NaverReverseGeocodeRes) => {
        if (status !== naver.maps.Service.Status.OK) {
          reject(new Error('Something went wrong!'));
        }
        resolve(res);
      },
    );
  });
};

export const searchNaverPlaceFromAddress = async (
  coords: naver.maps.LatLng,
) => {
  const address = await searchCoordinateToAddress(coords);
  /**
   * "status": {
   *   "code": 3,
   *   "name": "no results",
   *   "message": "요청한 데이타의 결과가 없습니다."
   * },
   */
  if (
    address.v2.status.code ===
    naver.maps.Service.ReverseGeocodeStatusCode.CODE_3
  ) {
    return null;
  }

  const isJibunAddressValid = address.v2.address.jibunAddress.length > 0;
  const isRoadAddressValid = address.v2.address.roadAddress.length > 0;

  if (!isJibunAddressValid && !isRoadAddressValid) {
    return null;
  }

  const url = new URL(
    'https://mkuxhpkgdtxmytgksvue.supabase.co/functions/v1/naver-address-api',
  );
  const params = new URLSearchParams({
    query: encodeURIComponent(
      isRoadAddressValid
        ? address.v2.address.roadAddress
        : address.v2.address.jibunAddress,
    ),
  });

  const fullUrl = url.toString() + '?' + params.toString();

  const res = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
  });

  const json = await res.json();
  return {
    requested: {
      url: fullUrl,
      query: decodeURIComponent(params.get('query')!),
    },
    ...json,
  };
};

const NaverMap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & NaverMapProps
>(function WrappedNaverMap(
  {
    children,
    mapId,
    mapOptions = {
      zoom: 15,
      scaleControl: true,
      mapDataControl: true,
      draggable: true,
      disableDoubleClickZoom: true,
      disableDoubleTapZoom: true,
    } satisfies naver.maps.MapOptions,
  },
  ref,
) {
  const mapRef = React.useRef<naver.maps.Map>(null);
  const onClickCallbackRef =
    React.useRef<(e: NaverMapClickEvent, map: naver.maps.Map) => void>(null);
  const [isInitialized, setInitialized] = React.useState(false);
  const [clickedCoord, setClickedCoord] =
    React.useState<naver.maps.LatLng | null>(null);
  const [geolocationPermissionError, setGeolocationPermissionError] =
    React.useState<MinifiedGeolocationPositionError | null>(null);

  const initializeMap = React.useCallback(() => {
    const map = new window.naver.maps.Map(mapId, mapOptions);
    map.addListener('click', (e) => {
      onClickCallbackRef.current?.({ coord: e.coord, type: 'click' }, map);
      setClickedCoord?.(e.coord);
    });
    mapRef.current = map;
    setInitialized(true);
  }, []);

  return (
    <NaverMapContext.Provider
      value={{
        mapRef,
        isInitialized,
        setInitialized,
        onClickCallbackRef,
        mapId,
        clickedCoord,
        setClickedCoord,
        geolocationPermissionError,
        setGeolocationPermissionError,
      }}
    >
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        onReady={initializeMap}
      />
      {children}
    </NaverMapContext.Provider>
  );
});

const NaverMapContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onClickMap?: (e: NaverMapClickEvent, map: naver.maps.Map) => void;
    asChild?: boolean;
  }
>(({ className, onClickMap, asChild = false, ...props }, ref) => {
  const { isInitialized, onClickCallbackRef, mapId } = useNaverMap();
  React.useEffect(() => {
    if (onClickMap) {
      onClickCallbackRef.current = onClickMap;
    }
  }, [isInitialized]);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      id={mapId}
      className={cn('w-full h-96', className)}
      {...props}
      ref={ref}
    />
  );
});

const NaverMapInitializer = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & {}
>(({ children, className, ...props }, ref) => {
  const { mapRef, setGeolocationPermissionError } = useNaverMap();

  const initLocation = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        mapRef.current?.setCenter(
          new naver.maps.LatLng([
            position.coords.longitude,
            position.coords.latitude,
          ]),
        );
        setGeolocationPermissionError?.(null);
      },
      (err) => {
        setGeolocationPermissionError?.({
          code: err.code,
          message: err.message,
        });
      },
    );
  }, []);

  React.useEffect(() => {
    initLocation();
  }, []);

  return (
    <Button onClick={initLocation} {...props}>
      {children}
    </Button>
  );
});

const NaverMapAuthorizer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ children, className, ...props }, ref) => {
  const { geolocationPermissionError } = useNaverMap();

  if (geolocationPermissionError?.code === 1) {
    return (
      <div
        className={cn(
          'text-destructive-foreground border-l-2 border-destructive-foreground px-4',
          className,
        )}
        {...props}
        ref={ref}
      >
        에러: 위치 권한이 거부되었습니다. 브라우저 설정에서 위치권한을
        허용해주세요.
      </div>
    );
  }

  if (geolocationPermissionError?.code === 2) {
    return (
      <div
        className={cn(
          'text-destructive-foreground border-l-2 border-destructive-foreground px-4',
          className,
        )}
        {...props}
        ref={ref}
      >
        에러: 현재 위치를 가져올 수 없습니다. 다시 시도해주세요.
      </div>
    );
  }

  if (geolocationPermissionError?.code === 3) {
    return (
      <div
        className={cn(
          'text-destructive-foreground border-l-2 border-destructive-foreground px-4',
          className,
        )}
        {...props}
        ref={ref}
      >
        에러: 위치를 가져오는데 시간이 너무 오래 걸립니다. 다시 시도해주세요.
      </div>
    );
  }

  // shows nothing when there is no error
  return null;
});

const NaverCoordinateDisplay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, ...props }, ref) => {
  const { clickedCoord } = useNaverMap();

  return (
    <div className={cn('text-sm', className)} {...props} ref={ref}>
      <pre>{JSON.stringify(clickedCoord, null, 2)}</pre>
    </div>
  );
});

const SuspendedNaverMapAddress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    resPromise: Promise<NaverReverseGeocodeRes>;
  }
>(({ className, resPromise, ...props }, ref) => {
  const res = React.use(resPromise);

  return (
    <div className={cn('text-sm', className)} {...props} ref={ref}>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
});

const NaverMapAddress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { clickedCoord } = useNaverMap();

  if (!clickedCoord) {
    return null;
  }

  const resPromise = searchCoordinateToAddress(clickedCoord);

  return (
    <React.Suspense fallback={<div>로딩중...</div>}>
      <SuspendedNaverMapAddress resPromise={resPromise} {...props} ref={ref} />
    </React.Suspense>
  );
});

const SuspendedNaverSearchPlace = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    resPromise: Promise<NaverReverseGeocodeRes>;
  }
>(({ className, resPromise, ...props }, ref) => {
  const res = React.use(resPromise);

  return (
    <div className={cn('text-sm', className)} {...props} ref={ref}>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
});

const NaverSearchPlace = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, ...props }, ref) => {
  const { clickedCoord } = useNaverMap();

  if (!clickedCoord) {
    return null;
  }

  const resPromise = searchNaverPlaceFromAddress(clickedCoord);

  return (
    <React.Suspense fallback={<div>로딩중...</div>}>
      <SuspendedNaverSearchPlace {...props} resPromise={resPromise} ref={ref} />
    </React.Suspense>
  );
});

const NaverZoomControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, ...props }, ref) => {
  const { mapRef } = useNaverMap();

  return (
    <div>
      <Button
        onClick={() => {
          mapRef.current?.zoomBy(1);
        }}
        variant={'outline'}
      >
        +
      </Button>
      <Button
        onClick={() => {
          mapRef.current?.zoomBy(-1);
        }}
        variant={'outline'}
      >
        -
      </Button>
    </div>
  );
});

export {
  NaverMap,
  NaverZoomControl,
  NaverMapInitializer,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverCoordinateDisplay,
  NaverMapAddress,
  NaverSearchPlace,
};
