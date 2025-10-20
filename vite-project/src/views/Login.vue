<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { useRouter } from "vue-router";

import pageHeader from "./../components/pageHeader.vue";

const router = useRouter();

const searchText = ref("");
const searchResults = ref([]);

function setSearchHandler(text) {
  searchText.value = text;
}

// тут будет логика авторизации
// и если авторизация прошла успешно, то в local storage проставляется флаг о том что он авторизован
// и переадресуется на страницу создания товаров

const statusMessage = ref("");

const simpleSchema = {
  login(value) {
    if (!value) {
      return "Необходимо заполнить логин";
    }
    if (value !== 'admin') {
      return "Неверный логин";
    }
    return true;
  },
  password(value) {
    if (!value) {
      return "Необходимо заполнить пароль";
    }
    if (value !== '1234') {
      return "Неверный пароль";
    }
    return true;
  },
};

const onSubmit = async (values) => {
  console.log(values);

  statusMessage.value = "Авторизация...";

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    console.log("Ответ от сервера:", data);
    statusMessage.value = "Вы авторизованы! Вы будете перенаправлены на страницу добавления товара";
    localStorage.setItem("isAuth", true);

    setTimeout(() => {
      router.push({ name: "add_product" });
    }, 2000);

  } catch (error) {
    console.error("Ошибка при отправке:", error);
    statusMessage.value = "Произошла ошибка при отправке данных.";
  }
};
</script>

<template>
  <div>
    <page-header
      @setSearch="setSearchHandler"
      :results="searchResults"
    ></page-header>

    <section class="py-5">
      <div class="container">
        <h1 class="text-center pb-5">Авторизация</h1>

        <div class="text-center">
          <main class="form-signin">
            <Form
              class="needs-validation"
              @submit="onSubmit"
              :validation-schema="simpleSchema"  data-testid="form"
            >
              *логин - admin, пароль - 1234
              <div class="form-floating my-2">
                <Field
                  type="text"
                  class="form-control"
                  id="login"
                  name="login"
                  placeholder="логин"
                  data-testid="login"
                />
                <label for="login">Логин</label>
                <ErrorMessage class="error-message" name="login" />
              </div>
              <div class="form-floating my-2">
                <Field
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  placeholder="пароль"
                  data-testid="password"
                />
                <label for="password">Пароль</label>
                <ErrorMessage class="error-message" name="password" />
              </div>

              <button class="w-100 btn btn-lg btn-primary my-4" type="submit" data-testid="submit">
                Войти
              </button>

              <p class="h4 my-3 text-center">{{ statusMessage }}</p>
            </Form>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>
