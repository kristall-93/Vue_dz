<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";

const statusMessage = ref("");
const showPopup = ref(false);

const simpleSchema = {
  firstName(value) {
    // if the field is empty
    if (!value) {
      return "Необходимо заполнить имя";
    }
    // All is good
    return true;
  },
  lastName(value) {
    if (!value) {
      return "Необходимо заполнить фамилию";
    }
    return true;
  },
  phone(value) {
    if (!value) {
      return "Необходимо заполнить телефон";
    }
    const regex = /^(\+?\d{1,3}[- ]?)?(\(?\d{3,4}\)?[- ]?)?[\d\- ]{5,12}\d$/;
    if (!regex.test(value)) {
      return "Пожалуйста, введите верный телефон";
    }
    return true;
  },
  email(value) {
    if (!value) {
      return "Необходимо заполнить Email";
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return "Пожалуйста, введите верный Email";
    }
    return true;
  },
  city(value) {
    if (!value) {
      return "Необходимо заполнить город";
    }
    return true;
  },
  street(value) {
    if (!value) {
      return "Необходимо заполнить улицу";
    }
    return true;
  },
  building(value) {
    if (!value) {
      return "Необходимо заполнить дом";
    }
    return true;
  },
  agree(value) {
    if (value === true) {
      return true;
    }

    return "Необходимо подтвердить согласие";
  },
  name(value) {
    if (!value) {
      return "Необходимо заполнить имя с карты";
    }
    return true;
  },
  number(value) {
    if (!value) {
      return "Необходимо заполнить Номер карты";
    }
    return true;
  },
  expiration(value) {
    if (!value) {
      return "Необходимо заполнить Срок действия";
    }
    return true;
  },
  cvv(value) {
    if (!value) {
      return "Необходимо заполнить cvv";
    }
    return true;
  },
};

const { resetForm } = useForm();

const onSubmit = async (values) => {
  console.log(values);

  statusMessage.value = "Отправка...";

  showPopup.value = true;

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
    statusMessage.value = "Данные успешно отправлены!";
    resetForm();
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    statusMessage.value = "Произошла ошибка при отправке данных.";
  }

  // скрыть попап через 3 секунды
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
};
</script>

<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2 class="h2">Оформление заказа</h2>
    </div>
    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Ваша корзина</span>
          <span class="badge bg-primary rounded-pill">2</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Товар 1</h6>
            </div>
            <span class="text-body-secondary">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Товар 2</h6>
            </div>
            <span class="text-body-secondary">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Сумма (USD)</span> <strong>$20</strong>
          </li>
        </ul>
      </div>

      <div class="col-md-7 col-lg-8">
        <Form
          class="needs-validation"
          @submit="onSubmit"
          :validation-schema="simpleSchema"
          :initial-values="{ agree: false }"
        >
          <h4 class="mb-4">Личные данные</h4>

          <div class="row g-3 mb-4">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">Имя</label>
              <Field
                type="text"
                class="form-control"
                id="firstName"
                name="firstName"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="firstName" />
            </div>
            <div class="col-sm-6">
              <label for="lastName" class="form-label">Фамилия</label>
              <Field
                type="text"
                class="form-control"
                id="lastName"
                name="lastName"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="lastName" />
            </div>
            <div class="col-12">
              <label for="phone" class="form-label">Телефон</label>
              <Field
                type="phone"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="+79999999999"
              />
              <ErrorMessage class="error-message" name="phone" />
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <Field
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
              />
              <ErrorMessage class="error-message" name="email" />
            </div>
          </div>

          <h4 class="mt-5 mb-4">Адрес доставки</h4>

          <div class="row g-3 mb-4">
            <div class="col-md-5">
              <label for="city" class="form-label">Город</label>
              <Field
                type="text"
                class="form-control"
                id="city"
                name="city"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="city" />
            </div>
            <div class="col-md-5">
              <label for="street" class="form-label">Улица</label>
              <Field
                type="text"
                class="form-control"
                id="street"
                name="street"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="street" />
            </div>
            <div class="col-md-2">
              <label for="building" class="form-label">Дом</label>
              <Field
                type="text"
                class="form-control"
                id="building"
                name="building"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="building" />
            </div>
          </div>
          <div class="form-check">
            <Field
              type="checkbox"
              class="form-check-input"
              id="agree"
              name="agree"
              :value="true"
              :unchecked-value="false"
            />
            <label class="form-check-label" for="agree"
              >Я согласен с правилами обработки заказа</label
            >
            <ErrorMessage class="error-message" name="agree" />
          </div>

          <h4 class="mt-5 mb-4">Данные для оплаты</h4>

          <div class="row gy-3 mb-4">
            <div class="col-md-6">
              <label for="name" class="form-label">Имя</label>
              <Field
                type="text"
                class="form-control"
                id="name"
                name="name"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="name" />
            </div>
            <div class="col-md-6">
              <label for="number" class="form-label">Номер карты</label>
              <Field
                type="text"
                class="form-control"
                id="number"
                name="number"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="number" />
            </div>
            <div class="col-md-3">
              <label for="expiration" class="form-label">Срок действия</label>
              <Field
                type="text"
                class="form-control"
                id="expiration"
                name="expiration"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="expiration" />
            </div>
            <div class="col-md-3">
              <label for="cvv" class="form-label">CVV</label>
              <Field
                type="text"
                class="form-control"
                id="cvv"
                name="cvv"
                placeholder=""
              />
              <ErrorMessage class="error-message" name="cvv" />
            </div>
          </div>

          <button class="mt-5 w-100 btn btn-primary btn-lg" type="submit">
            Отправить
          </button>
        </Form>

        <!-- Попап   -->
        <div v-if="showPopup" class="popup">
          {{ statusMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.error-message {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f8f9fa;
  border: 1px solid #ccc;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 2px 20px 20px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  color: #333;
  font-size: 1.875em;
  font-weight: 700;
}
</style>
