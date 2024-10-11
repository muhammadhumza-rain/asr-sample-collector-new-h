<template>
  <div class="rounded-full p-2 cursor-pointer" :class="recording ? 'bg-red-200' : 'bg-gray-200'">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.3"
      stroke="red"
      class="w-16 h-16"
      v-if="!recording"
      @click="toggleRecording"
      name="mic"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      class="w-16 h-16"
      v-else
      @click="toggleRecording"
      name="stop"
    >
      <path
        fill-rule="evenodd"
        d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script>
import Service from "../api/Service";
import Recorder from "../lib/Recorder";
import convertTimeMMSS from "../lib/Utils";

const ERROR_MESSAGE =
  "Failed to use microphone. Please refresh and try again and permit the use of a microphone.";
const SUCCESS_MESSAGE = "Successfully recorded message!";

export default {
  name: "SpeechComponent",
  props: {
    // in minutes
    time: { type: Number, default: 1 },
    bitRate: { type: Number, default: 128 },
    sampleRate: { type: Number, default: 44100 },
    backendEndpoint: { type: String },
    buttonColor: { type: String, default: "green" },

    // callback functions
    afterRecording: { type: Function },
    successfulUpload: { type: Function },
    failedUpload: { type: Function },
    customUpload: { type: Function, default: null },
  },

  data() {
    return {
      recording: false,
      recordedAudio: null,
      recordedBlob: null,
      recordedDuration: null,
      recorder: null,
      successMessage: null,
      errorMessage: null,
    };
  },
  computed: {
    recordedTime() {
      if (this.time && this.recorder?.duration >= this.time * 60) {
        this.toggleRecording();
      }
      return convertTimeMMSS(this.recorder?.duration);
    },
  },
  // beforeUnmount() {
  //   if (this.recording) {
  //     this.stopRecorder();
  //   }
  // },
  methods: {
    toggleRecording() {
      this.recording = !this.recording;
      if (this.recording) {
        this.initRecorder();
      } else {
        this.stopRecording();
      }
    },
    initRecorder() {
      this.recorder = new Recorder({
        micFailed: this.micFailed,
        bitRate: this.bitRate,
        sampleRate: this.sampleRate,
      });
      this.recorder.start();
      this.successMessage = null;
      this.errorMessage = null;
      this.service = new Service(this.backendEndpoint);
    },
    stopRecording() {
      // wait 1 second before stopping
      setTimeout(() => {
        this.recorder.stop();
        const recordList = this.recorder.recordList();
        this.recordedAudio = recordList[0].url;
        this.recordedDuration = recordList[0].duration;
        this.recordedBlob = recordList[0].blob;
        if (this.recordedAudio) {
          this.successMessage = SUCCESS_MESSAGE;
        }
        if (this.afterRecording) {
          this.afterRecording(this.recordedBlob, this.recordedAudio, this.recordedDuration);
        }
      }, 500);
    },
    async sendData() {
      if (!this.recordedBlob) {
        return;
      }

      let result = null;
      if (this.customUpload) {
        result = await this.customUpload(this.recordedBlob);
      } else {
        result = await this.service.postBackend(this.recordedBlob);
      }

      if (result) {
        this.errorMessage = null;
        this.successMessage = SUCCESS_MESSAGE_SUBMIT;
        if (this.successfulUpload) {
          this.successfulUpload();
        }
      } else {
        // error uploading
        this.successMessage = null;
        this.errorMessage = ERROR_SUBMITTING_MESSAGE;
        if (this.failedUpload) {
          this.failedUpload();
        }
      }
    },
    micFailed() {
      this.recording = false;
      this.errorMessage = ERROR_MESSAGE;
    },
  },
};
</script>
