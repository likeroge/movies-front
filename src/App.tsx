import React, { useState } from "react";
import "./App.scss";
import { ContentList } from "./components/content-list/content-list";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { ModalDiagram } from "./components/modal-diagram/modal-diagram";
import { ModalFilter } from "./components/modal-filter/modal-filter";
import { useModal } from "./hooks/useModal";

export interface IFetchConfig {
  filter: string;
  text: string;
}

function App() {
  const [fetchConfig, setFetchConfig] = useState<IFetchConfig>({
    filter: "",
    text: "",
  });
  const filterModal = useModal();
  const diagramModal = useModal();

  return (
    <>
      <ModalFilter
        visible={filterModal.visible}
        setVisible={filterModal.setVisible}
        setFetchConfig={setFetchConfig}
      />
      <ModalDiagram
        visible={diagramModal.visible}
        setVisible={diagramModal.setVisible}
      />
      <div className="app-wrapper">
        <Header />
        <Main>
          <ContentList fetchConfig={fetchConfig} />
        </Main>
        <Footer
          setFilterVisible={filterModal.setVisible}
          filterVisible={filterModal.visible}
          setDiagramVisible={diagramModal.setVisible}
        />
      </div>
    </>
  );
}

export default App;
