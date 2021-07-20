

import { createGlobalStyle } from "styled-components";
import LatoBlack from '../../fonts/Lato-Black.ttf';
import LatoBlackItalic from '../../fonts/Lato-BlackItalic.ttf';
import LatoBold from '../../fonts/Lato-Bold.ttf';
import LatoBoldItalic from '../../fonts/Lato-BoldItalic.ttf';
import LatoItalic from '../../fonts/Lato-Italic.ttf';
import LatoLight from '../../fonts/Lato-Light.ttf';
import LatoLightItalic from '../../fonts/Lato-LightItalic.ttf';
import LatoRegular from '../../fonts/Lato-Regular.ttf';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Lato', sans-serif;
  src: url(${LatoBlack}) format('ttf'),
       url(${LatoBlackItalic}) format('ttf'),
       url(${LatoBold}) format('ttf'),
       url(${LatoBoldItalic}) format('ttf'),
       url(${LatoItalic}) format('ttf'),
       url(${LatoLight}) format('ttf'),
       url(${LatoLightItalic}) format('ttf'),
       url(${LatoRegular}) format('ttf');
}
:root{
  font-size: 10px;
}
`;

export default GlobalStyles;