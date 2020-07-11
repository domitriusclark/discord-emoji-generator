import React from 'react';
import { useImage } from 'use-cloudinary'

import {
  Image as ChakraImage,
  Skeleton
} from '@chakra-ui/core'

export default function Image({ publicId, transformations, width, height, cloudName, ...rest }) {
  const {
    generateUrl,
    blurredPlaceholderUrl,
    url,
    isError,
    isSuccess,
    error,
    ref,
    supportsLazyLoading,
    inView
  } = useImage({ cloudName });

  React.useEffect(() => {
    generateUrl({
      publicId,
      transformations: {
        width,
        height,
        ...transformations
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId, height, width, transformations])

  if (isError) return <p>{error.message}</p>;

  return (
    <Skeleton
      ref={!supportsLazyLoading ? ref : undefined}
      isLoaded={isSuccess}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `no-repeat url(${blurredPlaceholderUrl(publicId, width, height)})`
      }}>
      {inView || supportsLazyLoading ? (
        <ChakraImage
          src={url}
          loading="lazy"
          htmlHeight={height}
          htmlWidth={width}
          {...rest}
        />
      ) : null}
    </Skeleton>
  )
}