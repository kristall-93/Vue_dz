import component from "./Product.vue";
import { mount } from "@vue/test-utils";
import { vi } from "vitest";

// Мокаем fetch и localStorage
global.fetch = vi.fn();
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe("Product", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Устанавливаем дефолтное поведение localStorage
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it("mounts without errors", () => {
    // Мокаем fetch
    fetch.mockResolvedValueOnce({
      json: async () => ({}),
    });

    const wrapper = mount(component, {
      props: {
        productId: 1
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("loads product data on mount", async () => {
    // Мокаем ответ API
    const mockProduct = {
      id: 1,
      title: "Test Product",
      price: 29.99,
      description: "Test description",
      image: "test-image.jpg"
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockProduct,
    });

    const wrapper = mount(component, {
      props: {
        productId: 1
      }
    });

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    // fetch вызван с правильным URL
    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products/1");

    // данные товара загружены
    expect(wrapper.vm.product).toEqual(mockProduct);
  });

  it("adds product to cart when button is clicked", async () => {

    const mockProduct = {
      id: 1,
      title: "Test Product",
      price: 29.99,
      description: "Test description",
      image: "test-image.jpg"
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockProduct,
    });

    const wrapper = mount(component, {
      props: {
        productId: 1
      }
    });

    // Ждем загрузки данных
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    // Находим кнопку "Добавить в корзину"
    const addToCartButton = wrapper.find('button');
    
    // Проверяем, что кнопка существует
    expect(addToCartButton.exists()).toBe(true);
    expect(addToCartButton.text()).toContain('Добавить в корзину');

    // Кликаем по кнопке
    await addToCartButton.trigger('click');

    // Проверяем, что товар добавлен в корзину
    expect(wrapper.vm.cart).toHaveLength(1);
    expect(wrapper.vm.cart[0]).toEqual({
      ...mockProduct,
      count: 1
    });

    // Проверяем, что корзина сохранена в localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{ ...mockProduct, count: 1 }])
    );
  });
});
