// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      mainTextColor: string;
      subTextColor: string;
      secondary: string;
      boxLineColor: string;
      boxHoverColor: string;
    };
  }
}
