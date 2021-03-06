import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Login } from "../../pages";

const datatestids = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  login: 'common_login__button-login',
  register: 'common_login__button-register',
  warning: 'common_login__element-invalid-email'
};

const customerUser = {
  email: "zebirita@email.com",
  password: "$#zebirita#$",
};

describe("Teste da Página de Login", () => {

  test('Testa se o botão da página esta desabilitado', () => {
    render(
      <Login />
    );

    const button = screen.getByTestId(datatestids.login);
    expect(button).toBeInTheDocument();
    expect(button).toHaveProperty('disabled', true);
  });

  test('Testa se todos os data-testid estão presentes na tela', () => {
    render(
        <Login />
    );

    Object.values(datatestids).map(value => {
      const SUT = screen.getByTestId(value);
      expect(SUT).toBeInTheDocument();
    });
  });

  test('Testa se é possivel logar com sucesso', () => {
    render(
        <Login />
    );

    const emailInput = screen.getByTestId(datatestids.email);
    const passwordInput = screen.getByTestId(datatestids.password);
    const loginButton = screen.getByTestId(datatestids.login);

    userEvent.type(emailInput, customerUser.email);
    userEvent.type(passwordInput, customerUser.password);

    expect(loginButton).toHaveProperty('disabled', false);

  });

  test('Testa se aparece um wanning quando não é possivel logar', async () => {
    render(
      <Login />
    );

    const emailInput = screen.getByTestId(datatestids.email);
    const passwordInput = screen.getByTestId(datatestids.password);
    const loginButton = screen.getByTestId(datatestids.login);
    const warnning = screen.getByTestId(datatestids.warning);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(warnning).toBeInTheDocument();

    expect(loginButton).toHaveProperty('disabled', true);

    userEvent.type(emailInput, `${customerUser.email}1`);
    userEvent.type(passwordInput, customerUser.password);

    expect(loginButton).toHaveProperty('disabled', false);
    userEvent.dblClick(loginButton);
    await waitFor(() => expect(warnning).toHaveClass('error'));
   
    expect(warnning.innerHTML).toMatch("Invalid fields")

  });

});