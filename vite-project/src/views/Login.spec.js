import component from "./Login.vue";
import { mount } from "@vue/test-utils";
import { vi } from "vitest";

// Мокаем vue-router
// const mockPush = vi.fn();
// vi.mock("vue-router", () => ({
//   useRouter: () => ({
//     push: mockPush,
//   }),
// }));

// Мокаем fetch
global.fetch = vi.fn();


describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('mounts without errors', () => {
    const wrapper = mount(component);
    expect(wrapper.exists()).toBe(true);
  });
  
  it('incorrect login and password', async () => {
    const wrapper = mount(component);
    
    const loginField = wrapper.find('[data-testid="login"]');
    const passwordField = wrapper.find('[data-testid="password"]');
    const form = wrapper.find('[data-testid="form"]');
    
    expect(loginField.exists()).toBe(true);
    expect(passwordField.exists()).toBe(true);
    expect(form.exists()).toBe(true);
    
    // неверные значения
    await loginField.setValue('wrong_login');
    await passwordField.setValue('wrong_password');
    
    await form.trigger('submit');
    
    // работа валидации (появление ошибок)
    await wrapper.vm.$nextTick();
    // Дополнительная задержка для vee-validate
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const errorMessages = wrapper.findAll('.error-message');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('submit with correct login and password', async () => {
    // Мокаем успешный ответ от сервера
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const wrapper = mount(component);
    
    const loginField = wrapper.find('[data-testid="login"]');
    const passwordField = wrapper.find('[data-testid="password"]');
    const form = wrapper.find('[data-testid="form"]');
    
    // правильные значения
    await loginField.setValue('admin');
    await passwordField.setValue('1234');
    
    await form.trigger('submit');
    
    // Ждем обработки формы
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(global.fetch).toHaveBeenCalledWith(
      "https://httpbin.org/post",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: 'admin',
          password: '1234'
        }),
      })
    );
  });

  it('button exists and is clickable', () => {
    const wrapper = mount(component);
    const submitButton = wrapper.find('button[type="submit"]');
    
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toBe('Войти');
    expect(submitButton.attributes('type')).toBe('submit');
  });
});
