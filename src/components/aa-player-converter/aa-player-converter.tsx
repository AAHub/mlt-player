import { Component, Element, State } from "@stencil/core";

@Component({
  tag: "aa-player-converter",
  styleUrl: "aa-player-converter.css"
})
export class PlayerConverterPage {
  @State() src: string = "";
  @State() mlt: string[] = [];

  @Element() el: HTMLElement;

  textInput(el) {
    this.setTextareaHeight(el.srcElement);
    this.src = el.srcElement.value;
  }

  async convert() {
    this.mlt = this.src.split("[SPLIT]");
    (this.el.closest("ion-nav") as any).push("aa-player", { mlt: this.mlt });
  }

  ionNavWillChange() {
    this.src = "";
    let textarea: any = this.el.querySelector("#aa-textarea");
    textarea.value = "";
  }
  setTextareaHeight = ta => {
    ta.style.fontSize = "12px";
    ta.style.lineHeight = "12px";
    ta.style.height = "30px";

    const minHeight = 300;
    if (ta.scrollHeight > ta.offsetHeight) {
      ta.style.height = ta.scrollHeight + "px";
    } else {
      var height, lineHeight;
      let idx = 0;
      while (true) {
        idx = idx + 1;
        height = Number(ta.style.height.split("px")[0]);
        lineHeight = Number(ta.style.lineHeight.split("px")[0]);
        ta.style.height = height - lineHeight + "px";
        if (
          ta.scrollHeight > ta.offsetHeight ||
          minHeight > ta.scrollHeight ||
          idx > 50000
        ) {
          ta.style.height = ta.scrollHeight + "px";
          break;
        }
      }
    }
  };

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
