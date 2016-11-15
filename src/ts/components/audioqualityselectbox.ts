import {SelectBox} from "./selectbox";
import {ListSelectorConfig} from "./listselector";
import {UIManager} from "../uimanager";

export class AudioQualitySelectBox extends SelectBox {

    constructor(config: ListSelectorConfig = {}) {
        super(config);
    }

    configure(player: bitmovin.player.Player, uimanager: UIManager): void {
        let self = this;

        let updateAudioQualities = function () {
            let audioQualities = player.getAvailableAudioQualities();

            self.clearItems();

            // Add entry for automatic quality switching (default setting)
            self.addItem("auto", "auto");

            // Add audio qualities
            for(let audioQuality of audioQualities) {
                self.addItem(audioQuality.id, audioQuality.label);
            }
        };

        self.onItemSelected.subscribe(function(sender: AudioQualitySelectBox, value: string) {
            player.setAudioQuality(value);
        });

        player.addEventHandler(bitmovin.player.EVENT.ON_AUDIO_CHANGE, updateAudioQualities);
        // TODO update audioQualitySelectBox when audio quality is changed from outside (through the API)
        // TODO implement ON_AUDIO_QUALITY_CHANGED event in player API

        updateAudioQualities();
    }
}