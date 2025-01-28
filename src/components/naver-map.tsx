'use client';
import { NaverReverseGeocodeRes } from '@/app/types/map';
import Script from 'next/script';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

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
  onClickCallbackRef: React.RefObject<((e: NaverMapClickEvent) => void) | null>;
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

function useNaverMap() {
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
    React.useRef<(e: NaverMapClickEvent) => void>(null);
  const [isInitialized, setInitialized] = React.useState(false);
  const [clickedCoord, setClickedCoord] =
    React.useState<naver.maps.LatLng | null>(null);
  const [geolocationPermissionError, setGeolocationPermissionError] =
    React.useState<MinifiedGeolocationPositionError | null>(null);

  const initializeMap = React.useCallback(() => {
    const map = new window.naver.maps.Map(mapId, mapOptions);
    map.addListener('click', (e) => {
      onClickCallbackRef.current?.({ coord: e.coord, type: 'click' });
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
    onClickMap?: (e: NaverMapClickEvent) => void;
  }
>(({ className, onClickMap, ...props }, ref) => {
  const { isInitialized, onClickCallbackRef, mapId } = useNaverMap();
  React.useEffect(() => {
    if (onClickMap) {
      onClickCallbackRef.current = onClickMap;
    }
  }, [isInitialized]);

  return (
    <div
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
    <React.Suspense>
      <SuspendedNaverMapAddress resPromise={resPromise} {...props} ref={ref} />
    </React.Suspense>
  );
});

export {
  NaverMap,
  NaverMapInitializer,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverCoordinateDisplay,
  NaverMapAddress,
};
