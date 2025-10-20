import component from "./Cart.vue";
import { mount } from "@vue/test-utils";

const mockCartItems = [
  { id: 1, title: "Товар 1", price: 10.50, count: 2, image: "image1.jpg" },
  { id: 2, title: "Товар 2", price: 25.00, count: 1, image: "image2.jpg" }
];

describe("Cart", () => {

  beforeEach(() => {
    // Перед каждым тестом устанавливаем мок-данные в localStorage
    localStorage.setItem("cart", JSON.stringify(mockCartItems));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("mounts without errors", () => {
    const wrapper = mount(component);
    expect(wrapper.exists()).toBe(true);
  });

  it("button plus", async () => {
    const wrapper = mount(component);
    const buttonPlus = wrapper.find('[data-testid="plus"]');
    await buttonPlus.trigger('click');

    expect(wrapper.find('[data-testid="count"]').element.value).toBe('3');
    expect(wrapper.find('[data-testid="summary"]').text()).toBe('$56.5');
  });

  it("button minus", async () => {
    const wrapper = mount(component);
    const buttonMinus = wrapper.find('[data-testid="minus"]');
    await buttonMinus.trigger('click');
    
    expect(wrapper.find('[data-testid="count"]').element.value).toBe('1');
    expect(wrapper.find('[data-testid="summary"]').text()).toBe('$35.5');
  });
});
