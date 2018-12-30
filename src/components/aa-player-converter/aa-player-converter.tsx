import { Component, Element, State } from "@stencil/core";

@Component({
  tag: "aa-player-converter",
  styleUrl: "aa-player-converter.css"
})
export class PlayerConverterPage {
  @State() src: string = "";

  @Element() el: HTMLElement;

  textInput(el) {
    this.src = el.srcElement.value;
  }

  async convert() {
    const mlt = this.src.split("[SPLIT]");
    (this.el.closest("ion-nav") as any).push("aa-player", { mlt: mlt });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>コンバーター</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <div class="input-aa-wrapper">
          <textarea
            id="aa-textarea"
            class="input-aa"
            placeholder="MLTを入力"
            onInput={e => this.textInput(e)}
          />
        </div>
        <div class="convert-button-wrapper">
          <ion-button class="u-mt16" onClick={() => this.convert()}>
            コンバート
          </ion-button>
        </div>
        <div class="is-center footer u-mt40 u-mb20">
          <nav-footer />
        </div>
      </ion-content>
    ];
  }
}
