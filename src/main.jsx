import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  HomeP,
  SingUpP,
  LoginP,
  AddPostP,
  AllPosts,
  Post,
  EditPost
} from "./pages/indexP.js";
import AuthLayout from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/home",
        element:<HomeP/>
      },
      {
        index: true,
        element: (
            <HomeP />
        ),
      },
      {
        path: "signup",
        element: <SingUpP />,
      },
      {
        path: "login",
        element: <LoginP />,
      },
      {
        path: "all-posts",
        element: (
          <AuthLayout>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "add-post",
        element: (
          <AuthLayout>
            <AddPostP />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path:"edit-post/:slug",
        element:<EditPost/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  
);
