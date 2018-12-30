import { Component, State, Prop } from "@stencil/core";

@Component({
  tag: "aa-player",
  styleUrl: "aa-player.css"
})
export class PlayerPage {
  @Prop() mlt: string[] = [];
  @State() idx: number = 0;
  isPlay: boolean = false;
  playingId: any;

  play() {
    if (this.isPlay) {
      return;
    }
    this.isPlay = true;
    this.playingId = setInterval(async () => {
      if (this.idx + 1 < this.mlt.length) {
        this.idx = this.idx + 1;
      } else {
        this.idx = 0;
      }
    }, 100);
  }

  refresh() {
    this.idx = 0;
    this.isPlay = false;
    clearInterval(this.playingId);
  }

  pause() {
    this.isPlay = false;
    clearInterval(this.playingId);
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>プレイヤー</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <div class="mlt-preview-wrapper">
          <div class="controller-wrapper">
            <ion-button
              color="dark"
              size="small"
              fill="clear"
              onClick={() => this.refresh()}
            >
              <ion-icon slot="icon-only" name="skip-backward"></ion-icon>
            </ion-button>
            <ion-button
              color="dark"
              size="small"
              fill="clear"
              onClick={() => this.play()}
            >
              <ion-icon slot="icon-only" name="play" />
            </ion-button>
            <ion-button
              color="dark"
              size="small"
              fill="clear"
              onClick={() => this.pause()}
            >
              <ion-icon slot="icon-only" name="pause" />
            </ion-button>
            <div class="index">
              {this.idx + 1}/{this.mlt.length}
            </div>
          </div>
          <div class="preview-wrapper">{this.mlt[this.idx]}</div>
        </div>
        <div class="is-center footer u-mt40 u-mb20">
          <nav-footer />
        </div>
      </ion-content>
    ];
  }
}
