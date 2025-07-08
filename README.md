# 🧠 Automatic Typer

Simule digitação automática em arquivos do VSCode, caractere por caractere, com controle de início e parada.

---

## ✨ Funcionalidades

- Digita automaticamente uma string no editor, letra por letra
- Controlado por comandos do VSCode
- Loop contínuo até que você pare manualmente
- Delay por caractere (200ms por caractere, por padrão)
- Delay configurável por sequência de caracteres digitas (5000ms por padrão)

---

## ▶️ Como usar

1. Abra um arquivo qualquer no VSCode
2. Use o atalho `Ctrl+Shift+P` / `Cmd+Shift+P` para abrir a **Command Palette**
3. Execute:
   - `Automatic Typer: Iniciar` → começa a digitação automática
   - `Automatic Typer: Parar` → para a digitação

---

## 🛠 Comandos disponíveis

| Comando                      | Descrição                              |
| ---------------------------- | ---------------------------------------- |
| `Automatic Typer: Iniciar` | Inicia o loop de digitação automática |
| `Automatic Typer: Parar`   | Interrompe imediatamente a digitação   |
