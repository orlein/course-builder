'use client';
import { NaverReverseGeocodeRes } from '@/app/types/map';
import Script from 'next/script';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const mapId = 'naver-map';

type NaverMapClickEvent = {
  coord: naver.maps.LatLng;
  type: 'click';
};
type NaverMapProps = {
  mapOptions?: naver.maps.MapOptions;
  // onClickMap?: (e: NaverMapClickEvent) => void;
};

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationPositionError) */
type MinifiedGeolocationPositionError = {
  code: number;
  message: string;
};

type NaverMapContextProps = {
  mapRef: React.RefObject<naver.maps.Map | null>;
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
  map: naver.maps.Map,
  resCallback: (res: NaverReverseGeocodeRes) => void,
) => {
  naver.maps.Service.reverseGeocode(
    // options
    {
      coords: coords,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR,
      ].join(','),
    },
    // callback
    function (status: naver.maps.Service.Status, res: NaverReverseGeocodeRes) {
      // 응답을 못 받으면 'Something went wrong' alert 띄우기
      if (status !== naver.maps.Service.Status.OK) {
        return alert('Something went wrong!');
      }

      resCallback(res);
    },
  );
};

const NaverMap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & NaverMapProps
>(function WrappedNaverMap(
  {
    children,
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
  const [clickedCoord, setClickedCoord] =
    React.useState<naver.maps.LatLng | null>(null);
  const [geolocationPermissionError, setGeolocationPermissionError] =
    React.useState<MinifiedGeolocationPositionError | null>(null);

  const initializeMap = React.useCallback(() => {
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;
  }, []);

  return (
    <NaverMapContext.Provider
      value={{
        mapRef,
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
>(({ className, ...props }, ref) => {
  const { mapRef, setClickedCoord } = useNaverMap();

  React.useEffect(() => {
    mapRef.current?.addListener('click', (e) => {
      props?.onClickMap?.({ coord: e.coord, type: 'click' });
      setClickedCoord?.(e.coord);
    });
  }, []);

  return <div id={mapId} style={{ width: '100%', height: 400 }} ref={ref} />;
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
    <div {...props} className={cn('text-sm', className)} ref={ref}>
      <pre>{JSON.stringify(clickedCoord, null, 2)}</pre>
    </div>
  );
});

export {
  NaverMap,
  NaverMapInitializer,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverCoordinateDisplay,
};
