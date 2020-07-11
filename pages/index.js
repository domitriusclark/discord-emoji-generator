import Image from '../components/Image'
import { useSearch } from 'use-cloudinary';
import { Grid } from '@chakra-ui/core';

const CLOUD_NAME = "testing-hooks-upload";

export default function Home() {
  const {
    search,
    data,
    isLoading,
    isError,
    error
  } = useSearch({ cloudName: CLOUD_NAME });

  React.useEffect(() => search({ resourceType: "image" }), []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gridAutoRows="200px"
      gridGap="5px"
      gridAutoFlow="dense"
    >
      {data && data.resources.map((image) =>
        <Image
          publicId={image.publicId}
          cloudName={CLOUD_NAME}
          borderRadius="12px"
          alt="Lazy-loaded"
        />
      )}
    </Grid>
  )
}
