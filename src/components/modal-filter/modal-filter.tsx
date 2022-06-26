import React, { FC, useRef } from "react";
import "./modal-filter.scss";
import closeIcon from "../assets/icons/closeIcon.png";

export const ModalFilter: FC<{
  visible: boolean;
  setVisible: Function;
  setFetchConfig: Function;
}> = ({ visible, setVisible, setFetchConfig }) => {
  let filterType: any = useRef(null);
  let text: any = useRef();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchConfig({
      filter: filterType.current?.value,
      text: text.current?.value,
    });
    setVisible(false);
  };
  return (
    <div className="modal-filter" style={{ display: visible ? "" : "none" }}>
      <img
        className="modal-filter__close-icon"
        src={closeIcon}
        onClick={() => setVisible(false)}
        alt="closeIcon"
      />
      <form className="modal-filter__form" onSubmit={(e) => onSubmitHandler(e)}>
        <h1 className="modal-filter__title">Настройки фильтра</h1>

        <select name="" id="" className="modal-filter__select" ref={filterType}>
          <option value="genre">Жанры</option>
          <option value="actor">Актеры</option>
        </select>
        <input
          type="text"
          name="text"
          id=""
          className="modal-filter__input"
          ref={text}
        />
        <button type="submit">Применить</button>
      </form>
    </div>
  );
};
