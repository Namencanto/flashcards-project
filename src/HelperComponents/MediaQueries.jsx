import useWindowDimensions from "../hooks/useWindowDimensions";

function MediaQueries() {
  const minWidth1800 = useWindowDimensions().width < 1800;
  const minWidth1400 = useWindowDimensions().width < 1400;
  const minWidth1200 = useWindowDimensions().width < 1200;
  const minWidth1000 = useWindowDimensions().width < 1000;
  const minWidth800 = useWindowDimensions().width < 800;
  const minWidth600 = useWindowDimensions().width < 600;
  const minWidth400 = useWindowDimensions().width < 400;

  const Media = {
    minWidth400,
    minWidth600,
    minWidth800,
    minWidth1000,
    minWidth1200,
    minWidth1400,
    minWidth1800,
  };
  return Media;
}

export default MediaQueries;
