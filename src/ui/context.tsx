import React, { createContext, CSSProperties, FC } from "react";

interface IUiContext {
  textarea: CSSProperties;
  title: CSSProperties;
  text: CSSProperties;
  button: CSSProperties;
  input: CSSProperties;
}

export const UiContext = createContext<IUiContext>({
  title: {},
  button: {},
  textarea: {},
  text: {},
  input: {},
});

export const UiContextProvider: FC<{}> = (props) => (
  <UiContext.Provider
    value={{
      title: {
        fontFamily: "Proxima Nova",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: 20,
        // lineHeight: 24,
        color: "#000000",
      },
      input: {
        background: "#F1F8FB",
        borderRadius: 4,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        width: "100%",
        border: "none",
        height: 17,
        fontFamily: "Proxima Nova",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: 8,
      },
      textarea: {
        background: "#F1F8FB",
        borderRadius: 4,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        width: "100%",
        border: "none",
        height: 17,
        fontFamily: "Proxima Nova",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: 8,
      },
      text: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 11,
        // lineHeight: 13,
      },
      button: {
        fontFamily: "Proxima Nova",
        fontStyle: "normal",
        fontWeight: "normal",
        padding: "2 5",
        cursor: "pointer",
        fontSize: 8,
        backgroundColor: "white",
        border: "none",
        display: "flex",
        alignItems: "center",
      },
    }}
  >
    {props.children}
  </UiContext.Provider>
);
