import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
import Login from "./../views/Login.vue";
import Product from "./../views/Product.vue";
import AddProduct from "./../views/AddProduct.vue";
import Cart from "./../views/Cart.vue";
import Order from "./../views/Order.vue";

// создаем роутер:
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/catalog/:productId",
      name: "product",
      props: true,
      component: Product,
    },
    {
      path: "/add_product",
      name: "add_product",
      component: AddProduct,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/order",
      name: "order",
      component: Order,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth && to.name == 'add_product') {
    return next({name: 'login'})
  }

  return next()
})

export default router;