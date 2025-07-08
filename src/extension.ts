import * as vscode from "vscode";

let running = false;
let brakeTime: number = 0;
let delayBrakeTime: number = 5000;
let delay: number = 200;

export function activate(context: vscode.ExtensionContext) {
  const startDisposable = vscode.commands.registerCommand(
    "extension.automaticTypeStart",
    async () => {
      if (running) {
        vscode.window.showInformationMessage(
          "Automatic Typer já está rodando!"
        );
        return;
      }

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage(
          "Abra um arquivo para usar o Automatic Typer."
        );
        return;
      }

      const textToType = await vscode.window.showInputBox({
        prompt: "Digite o texto que será digitado automaticamente",
        placeHolder: 'Exemplo: console.log("Hello World!");',
      });

      if (!textToType) {
        vscode.window.showWarningMessage(
          "Nenhum texto informado. Cancelando Automatic Typer."
        );
        return;
      }

      await extractDelayBrakeTime();

      running = true;

      while (running) {
        for (let i = 0; i < textToType.length; i++) {
          if (!running) break;

          await new Promise((resolve) => setTimeout(resolve, delay)).then(
            () => (brakeTime += delay)
          );

          await editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.active, textToType[i]);
          });

          await imThinkinBro();
        }

        await editor.edit((editBuilder) => {
          editBuilder.insert(editor.selection.active, "\n");
        });

        await imThinkinBro();
      }
    }
  );

  const stopDisposable = vscode.commands.registerCommand(
    "extension.automaticTypeStop",
    () => {
      running = false;
      vscode.window.showInformationMessage("Automatic Typer parado.");
    }
  );

  context.subscriptions.push(startDisposable, stopDisposable);
}

async function extractDelayBrakeTime() {
  const inputBrakeTime = await vscode.window.showInputBox({
    prompt:
      "Você quer na digitação? Quantos segundos? (São 5 segundos por padrão)",
    placeHolder: "Exemplo: 5",
    validateInput: (text) => {
      return /^\d*$/.test(text) ? null : "Por favor, digite somente números";
    },
  });

  
  if (inputBrakeTime == null) {
    vscode.window.showWarningMessage(`${inputBrakeTime}`);
    extractDelayBrakeTime();
  }

  if (inputBrakeTime) {
    try {
      delayBrakeTime = Number(inputBrakeTime) * 1000;
    } catch (error) {
      delayBrakeTime = 5000;
    }
  }
}

async function imThinkinBro() {
  if (brakeTime == delayBrakeTime) {
    await new Promise((resolve) => setTimeout(resolve, brakeTime)).then(
      () => (brakeTime = 0)
    );
  }
}

export function deactivate() {
  running = false;
}
