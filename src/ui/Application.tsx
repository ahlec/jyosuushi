import classnames from "classnames";
import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router";

import { State } from "@jyosuushi/redux";
import { getIsQuizActive } from "@jyosuushi/redux/selectors";

import Header from "./Header";
import MainScreen from "./main-screen/MainScreen";
import NavigationManager from "./NavigationManager";
import QuizPage from "./modules/quiz/QuizPage";
import ToastDisplayContainer from "./toasts/ToastDisplayContainer";
import ToastManager from "./toasts/ToastManager";

import * as styles from "./Application.scss";

const QUIZ_SCREEN_PATH = "/quiz";

function Application(): React.ReactElement {
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isQuizActive = useSelector((state: State): boolean =>
    getIsQuizActive(state),
  );

  const renderNecessaryRedirect = (): React.ReactNode => {
    const isOnQuizScreen = pathname === QUIZ_SCREEN_PATH;
    if (isOnQuizScreen && !isQuizActive) {
      return <Navigate to="/" />;
    }

    if (!isOnQuizScreen && isQuizActive) {
      return <Navigate to={QUIZ_SCREEN_PATH} />;
    }
  };

  return (
    <ToastManager>
      <div
        className={classnames(
          styles.application,
          isQuizActive && styles.quizActive,
        )}
      >
        <NavigationManager />
        <Header isQuizActive={isQuizActive} onModalOpened={setIsModalOpen} />
        {renderNecessaryRedirect()}
        <Routes>
          <Route
            path={QUIZ_SCREEN_PATH}
            element={<QuizPage enabled={!isModalOpen} />}
          />
          <Route path="/*" element={<MainScreen />} />
        </Routes>
        <ToastDisplayContainer />
      </div>
    </ToastManager>
  );
}

export default Application;
