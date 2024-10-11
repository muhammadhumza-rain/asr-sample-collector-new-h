<template>
  <div
    v-if="!hasSeenHome && !finished"
    class="flex flex-col h-full w-full text-center justify-center items-center overflow-y-auto p-4"
    style="max-height: 100vh"
  >
    <div class="flex justify-center items-center w-full">
      <img src="images/logo-new.png" alt="ORVA Logo" class="w-1/3 pb-20" @click="resetApp()" />
    </div>
    <div
      class="w-2/3 text-xl text-left sm:w-full overflow-y-auto"
      style="max-height: calc(100vh - 200px)"
    >
      <p>
        Hello and thank you for your help providing voice samples to help train a new healthcare
        voice assistant.
      </p>

      <p class="leading-snug sm:text-lg">
        Your samples will contribute to an improved patient and provider experience in hospitals
        around the globe.
      </p>

      <p class="leading-snug sm:text-lg">The process will take about 15 minutes:</p>

      <ul class="list-disc ml-4 space-y-2 sm:text-lg">
        <li>
          First, you will enter some important details about yourself, your native language, and the
          device you are recording on (must have a quality working microphone that produces clear
          audio).
        </li>

        <li>
          Next, you will be guided through a series of prompts telling you what to say and how many
          times to say it.
        </li>

        <li>
          You will press the record button to record, and press it again to stop, for each phrase.
          Afterward, you will submit the recordings.
        </li>

        <li>You can play back your samples before submitting them to ensure they sound good.</li>

        <li class="leading-snug sm:text-lg" style="text-decoration: underline">
          Please make sure you are in an environment that is quiet, with no background noise.
        </li>
      </ul>
    </div>
    <div class="text-3xl cursor-pointer p-16 sm:text-xl" @click="goHome()">
      click <u>here</u> to continue
    </div>
    <!-- <div>
      <button
        class="justify-start bg-red-500 border text-white font-bold gap-2 py-1 px-2 rounded-full inline-flex items-center mr-2"
        @click="resetApp()"
      >
        Reset App
      </button>
    </div> -->
  </div>

  <div
    v-else-if="hasSeenHome && !finished"
    class="flex flex-col h-full w-full justify-center items-center overflow-y-auto"
    style="height: 100vh"
  >
    <div class="fixed top-8 right-4 z-50" @click="isUserModalOpen = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="gray"
        class="w-8 h-8 md:w-12 md:h-12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>

    <div
      id="header-text"
      class="flex flex-col w-full items-center text-xl text-gray-400 px-4 md:px-8 lg:px-16 pr-12 md:pr-20 pt-32 md:pt-20"
    >
      <!-- <div class="flex justify-center md:justify-start items-center w-full md:w-auto">
        <img src="images/logo-new.png" alt="ORVA Logo" class="w-1/4" />
      </div> -->
      <div class="flex w-full md:w-3/4 lg:w-2/3 flex-col justify-center items-center mt-0">
        <div class="text-center text-lg md:text-2xl">
          Select a phrase or sentence. Use the red button on the lower left to record and stop. Then
          playback, and click “check” to submit your sample, or re-record it.
        </div>
      </div>
    </div>
    <div v-if="phraseSynonymCount === null" class="text-black text-5xl text-center italic p-4">
      "{{ phrases[phraseCount].text }} " (samples required:
      {{ phrases[phraseCount].requiredSamples }})
    </div>
    <div v-else class="text-black text-5xl text-center italic p-4">
      "{{ phrases[phraseCount].synonyms[phraseSynonymCount].text }}" (samples required:
      {{ phrases[phraseCount].requiredSamples }})
    </div>
    <div class="flex flex-row w-full h-full gap-2 pr-2 pl-2">
      <div class="sm:w-full overflow-y-auto" style="max-height: 50vh">
        <div class="text-2xl text-gray-500 border-b border-gray-300 mb-2">Intents:</div>
        <div class="flex grid grid-cols-2 gap-2 sm:grid-cols-1">
          <button
            class="w-full gap-1 text-md font-bold font-semibold py-1 px-1 border-2 rounded-full inline-flex items-center justify-center"
            :class="
              index === phraseCount && phrase.count !== phrase.requiredSamples
                ? 'bg-gray-800 text-white border-gray-800'
                : phrase.count === phrase.requiredSamples
                ? 'bg-gray-300 text-gray-800 border-gray-400'
                : 'bg-gray-100 text-gray-800 border-gray-400'
            "
            v-for="(phrase, index) in phrases"
            style="
              margin-bottom: 3px;
              white-space: normal;
              word-wrap: break-word;
              overflow-wrap: break-word;
            "
            @click="goToPhrase(index)"
            :key="phrase.text"
            :disabled="phrase.count === phrase.requiredSamples"
          >
            <span class="text-sm sm:text-xs">{{ phrase.text }}</span>
            <span class="bg-gray-400 text-white text-xs font-bold py-1 px-2 rounded-full">
              {{ phrase.count }}
            </span>
          </button>
        </div>
      </div>
      <div id="content-area" class="flex flex-col w-full h-full overflow-y-auto">
        <div class="flex flex-col w-full h-full justify-start">
          <!-- <div class="text-2xl text-gray-500 border-b border-gray-300 mb-2">Synonyms:</div>
          <div
            class="flex grid grid-cols-2 w-full gap-1"
            v-if="phrases[phraseCount].synonyms.length > 0"
          >
            <button
              class="w-full gap-1 text-md font-bold font-semibold py-1 px-1 border-2 rounded-full inline-flex items-center justify-end"
              :class="
                index === phraseSynonymCount
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-gray-100 text-gray-800 border-gray-400'
              "
              v-for="(synonym, index) in phrases[phraseCount].synonyms"
              style="margin-bottom: 3px"
              @click="setPhraseSynonym(index)"
              :key="synonym"
            >
              <span>{{ synonym.text }}</span>
              <span class="bg-gray-400 text-white text-xs font-bold py-1 px-2 rounded-full">
                {{ synonym.count }}
              </span>
            </button>
          </div>
          <div v-else class="flex w-full h-full justify-center items-center text-2xl text-gray-500">
            No synonyms available
          </div> -->
        </div>

        <!-- <div class="flex justify-end">
          <button
            class="bg-white border border-gray-400 text-black gap-2 py-1 px-2 rounded-full inline-flex items-center mb-2 mr-2"
            @click="skipPhrase()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
              />
            </svg>
            Skip
          </button>
        </div> -->
        <!-- <div class="w-full h-6 dark:bg-gray-400">
          <span
            class="flex w-full justify-center items-center text-white font-bold"
            v-if="phrases[phraseCount].count == 0"
            >{{ phrases[phraseCount].count }} /
            {{ phrases[phraseCount].count > 10 ? phrases[phraseCount].count : 10 }}</span
          >
          <div
            class="flex bg-gray-700 font-bold h-6 text-white text-sm justify-center items-center"
            :style="`width: ${phrases[phraseCount].count * 10}%`"
          >
            <span class="flex w-full justify-center items-center text-white font-bold"
              >{{ phrases[phraseCount].count }} /
              {{ phrases[phraseCount].count > 10 ? phrases[phraseCount].count : 10 }}</span
            >
          </div>
        </div> -->
      </div>
    </div>
    <div v-if="validatedSteps(phrases)">
      <button
        class="justify-start bg-green-500 border text-white font-bold gap-2 py-3 px-5 rounded-full inline-flex"
        @click="finishProcess"
      >
        Finish
      </button>
    </div>
    <div
      id="speech-controls"
      class="flex w-full items-center"
      style="margin-bottom: 4px; margin-left: 4px"
    >
      <div class="flex flex-row w-full">
        <div>
          <SpeechComponent
            :time="3"
            :bitRate="1411"
            :sampleRate="47000"
            :successfulUpload="success"
            :failedUpload="failed"
            :afterRecording="afterRec"
            :backendEndpoint="backendEndpoint"
            :customUpload="customUp"
            :micDisabled="true"
          />
        </div>

        <div v-show="showPlayer" class="flex flex-row ml-8 justify-center items-center">
          <audio
            v-if="phraseSynonymCount === null"
            controls
            :src="phrases[phraseCount].audio[0]"
            type="audio/mpeg"
            class="mx-auto"
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <audio
            v-else
            controls
            :src="phrases[phraseCount].synonyms[phraseSynonymCount].audio[0]"
            type="audio/mpeg"
            class="mx-auto"
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="green"
            class="w-12 h-12 cursor-pointer ml-4 mr-2"
            @click="sampleAction('approve')"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="red"
            class="w-12 h-12 cursor-pointer"
            @click="sampleAction('reject')"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div v-if="finished" class="flex flex-col text-6xl h-full w-full justify-center items-center">
    <div class="flex justify-center items-center">
      <img src="images/logo-new.png" alt="ORVA Logo" class="w-1/3 pb-20" />
    </div>
    <div class="text-center w-1/2">
      Thank you, we will review your samples for quality and be in touch about next steps within 1-2
      days
    </div>
    <!-- Thank you for helping the ORVA team! -->
  </div>

  <div
    v-if="isCompelet && !finished"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  >
    <div
      class="relative top-20 mx-auto p-5 bg-white rounded-2xl shadow px-5 py-4 text-left max-w-2xl w-full"
    >
      <div class="mt-3">
        <div class="text-lg font-bold px-7 text-center">Thank you, please for the next step</div>
        <div class="flex justify-center items-center px-4 py-3 mt-5">
          <button
            @click="nextStep()"
            class="px-4 py-2 bg-gray-500 text-white text-base w-1/2 font-medium rounded-md w-full shadow-sm"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="isEulaOpen && hasSeenHome"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  >
    <div
      class="relative top-20 mx-auto p-5 bg-white rounded-2xl shadow px-5 py-4 text-left max-w-2xl w-full"
    >
      <div class="mt-3">
        <div class="text-lg font-bold px-7">Consent for Collection and Use of Voice Samples</div>
        <div class="mt-2 px-7 py-3">
          <div
            class="overflow-auto max-h-64 p-2"
            style="border: 1px solid #e3e3e3; scrollbar-width: thin"
          >
            <p>
              I hereby agree to provide RAIN Technology ME LTD. ("the Company") with voice samples
              for the purpose of training and improving the accuracy of the Company's automatic
              speech recognition (ASR) technology. I understand that these voice samples will be
              recorded and used as part of a dataset to develop, test, and enhance the ASR
              technology.
            </p>

            <p>Use of Data:</p>

            <p>
              I acknowledge that the voice samples I provide will be used exclusively for the
              development and improvement of ASR technology and related purposes.
            </p>

            <p>
              I understand that the Company may process and store these voice samples for the
              duration necessary to achieve the purposes mentioned above.
            </p>

            <p>Data Protection and Privacy:</p>

            <p>
              I have been informed about my rights under the General Data Protection Regulation
              (GDPR) and any applicable local data protection laws. This includes my right to
              access, rectify, erase, restrict processing of, or object to the processing of my
              personal data, as well as my right to data portability and the right to withdraw my
              consent at any time.
            </p>

            <p>
              I understand that my voice samples are considered personal data under the GDPR, and I
              consent to their collection, processing, and use as described above.
            </p>

            <p>
              I understand that the Company will take appropriate technical and organizational
              measures to ensure the security of my data, including protection against unauthorized
              or unlawful processing and against accidental loss, destruction, or damage.
            </p>

            <p>Voluntary Participation:</p>

            <p>
              I confirm that my participation is voluntary, and I have the right to withdraw my
              consent at any time without affecting the lawfulness of processing based on consent
              before its withdrawal.
            </p>

            <p>
              I understand that I can contact RAIN Technology ME LTD. via the email address
              “hello@rain.agency” if I have any questions or concerns regarding the use of my voice
              samples or if I wish to exercise any of my rights as mentioned above.
            </p>

            <p>
              By clicking "I Agree", I acknowledge that I have read and understood this consent
              form, and I agree to the collection and use of my voice samples as described herein.
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="items-center px-4 py-3">
          <button
            @click="saveEula()"
            class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="isUserModalOpen && hasSeenHome"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-10"
  >
    <div class="bg-white rounded-2xl shadow px-5 py-4 text-left max-w-2xl w-full">
      <div class="text-2xl font-semibold text-gray-900 pb-4">User Details</div>
      <div class="flex flex-col w-full text-md text-gray-700">
        <div class="text-red-500 font-bold text-center p-2">{{ errorMessage }}</div>
        <div class="flex flex-row gap-2 w-full">
          <div class="mb-4 w-1/2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Full Name*
            </label>
            <input
              class="bg-white border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
              v-model="userName"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div class="mb-4 w-1/2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email Address*
            </label>
            <input
              class="bg-white border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
              v-model="emailAddress"
              type="email"
              placeholder="Email Address"
            />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Native Language*
          </label>
          <select
            class="bg-white border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
            v-model="userEthnicity"
          >
            <option value="">Select One ...</option>
            <option value="Arabic - Egyptian">Arabic - Egyptian</option>
            <option value="Arabic - Emirati">Arabic - Gulf</option>
            <option value="Arabic - Iraqi">Arabic - Levantine</option>
            <option value="English - British">English - British</option>
            <option value="English - US">English - American</option>
            <option value="Farsi">Farsi</option>
            <option value="Filipino - Cebuano">Filipino</option>
            <option value="Filipino - Cebuano">Filipino - Cebuano</option>
            <option value="Filipino - Tagalog">Filipino - Tagalog</option>
            <option value="French">French</option>
            <option value="Hindi">Hindi</option>
            <option value="Italian">Indonesian</option>
            <option value="Kannada">Malay</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Mandarin">Pashto</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Russian">Russian</option>
            <option value="Spanish">Spanish</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Urdu">Urdu</option>
          </select>

          <div class="text-xs text-gray-400 mt-1 mb-2 italic">
            For better usability we are trying to capture as many accents as possible and that is
            why your native language would be of great help. That is the only reason why we are
            asking for your native language.
          </div>
        </div>

        <div class="flex flex-row gap-2 w-full">
          <!-- <div class="mb-4 w-1/2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="device">
              Environmental Factors
            </label>
            <select
              class="bg-white border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
              v-model="environmentAttributes"
            >
              <option value="">Speaking without Mask</option>
              <option value="Speaking with Mask">Speaking with Mask</option>
              <option value="Speaking in Noisy Environment">Speaking in Noisy Environment</option>
            </select>
          </div> -->
          <div class="mb-4 w-1/2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="device">
              Device Type*
            </label>
            <select
              class="bg-white border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
              v-model="deviceType"
            >
              <option value="">Select One ...</option>
              <option value="Mobile Phone - iPhone">Mobile Phone - iPhone</option>
              <option value="iPad - iOS">iPad - iOS</option>
              <option value="Tablet - Android">Tablet - Android</option>
              <option value="MacBook">MacBook</option>
              <option value="Mobile Phone - Android">Mobile Phone - Android</option>
              <option value="PC">PC</option>
              <option value="Headset / auxiliary mic plugged into device">
                Headset / auxiliary mic plugged into device
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <!-- <button
          class="bg-white-500 border border-gray-400 text-gray-400 gap-2 py-2 px-4 rounded-full inline-flex items-center mr-4"
          @click="isUserModalOpen = false"
        >
          Close
        </button> -->
        <button
          class="justify-start bg-red-500 border text-white font-bold gap-2 py-1 px-2 rounded-full inline-flex items-center mr-2"
          @click="resetApp()"
        >
          Reset App
        </button>
        <button
          class="bg-gray-400 border border-gray-400 text-white gap-2 py-2 px-4 rounded-full inline-flex items-center"
          @click="saveUser()"
        >
          Save
        </button>
      </div>
    </div>
  </div>

  <!-- <div
    v-if="hasSeenHome && !finished"
    class="fixed bottom-0 left-0 flex w-full h-10 bg-gray-400 text-white justify-center items-center"
  >
    {{ userAgent }} | {{ userIpAddress }}
  </div> -->
</template>

<style>
.transition-transform {
  transition: transform 0.3s ease;
}
</style>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import SpeechComponent from "./components/SpeechComponent.vue";
import { useAppStateStore } from "./stores/appState";
import { storeToRefs } from "pinia";

const appState = useAppStateStore();
const { saveSamples, saveUserDetails } = appState;
const {
  phraseCount,
  phraseSynonymCount,
  phrases,
  userAgent,
  userIpAddress,
  emailAddress,
  userName,
  userEthnicity,
  deviceType,
  environmentAttributes,
} = storeToRefs(appState);

const finished = ref(false);
const isCompelet = ref(false);

const showPlayer = ref(false);
const hasSeenHome = ref(false);
console.log(phrases);

window.addEventListener("error", function () {
  localStorage.clear();
  window.location.reload();
  console.error("Error caught! Local storage cleared.");
});

const goHome = () => {
  hasSeenHome.value = true;
  isEulaOpen.value = true;
};

// if (phrases.value.length > 0 && phrases.value[0].synonyms === undefined) {
//   resetApp();
// }

const backendEndpoint = computed(() => process.env.VUE_APP_BACKEND_ENDPOINT);
const isEulaOpen = ref(false);
const isUserModalOpen = ref(false);
const mainExpanded = ref(false);
const errorMessage = ref(null);

const resetApp = () => {
  localStorage.clear();
  window.location.reload();
};
const finishProcess = () => {
  // Logic when "Finish" button is clicked
  // alert("Process Finished!");
  finished.value = true;
};

// const getIntentsFromApi = async () => {
//   try {
//     const response = await fetch("/api/intents/");
//     const data = await response.json();
//     phrases.value = data;
//   } catch (error) {
//     console.log("Error fetching intents", error);
//   }
// };

// onBeforeMount(() => {
//   if (phrases.value.length === 0) getIntentsFromApi();
// });
const validatedSteps = (phrases) => {
  return phrases.every((item) => item.count === item.requiredSamples);
};
const saveEula = async () => {
  isEulaOpen.value = false;
  // post emailAddress.value to api endpoint
  try {
    const response = await fetch("https://stage.orva.app/api/eula/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailAddress.value,
      }),
    });
    const data = await response.json();
    console.log("EULA response", data);
  } catch (error) {
    console.log("Error fetching user IP", error);
  }
};

const getUserIP = async () => {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    userIpAddress.value = data.ip;
    userAgent.value = navigator.userAgent;
    localStorage.setItem("userIpAddress", data.ip);
    localStorage.setItem("userAgent", navigator.userAgent);
  } catch (error) {
    console.log("Error fetching user IP", error);
  }
};

if (userIpAddress.value === null) getUserIP();
if (emailAddress.value === null || deviceType.value === "") isUserModalOpen.value = true;

const saveUser = () => {
  if (
    emailAddress.value === null ||
    deviceType.value === "" ||
    userName.value === "" ||
    userEthnicity.value === ""
  ) {
    errorMessage.value = "Please fill in all fields!";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailAddress.value)) {
    errorMessage.value = "Please enter a valid email address!";
    return;
  }

  saveUserDetails(
    emailAddress.value,
    deviceType.value,
    environmentAttributes.value,
    userName.value,
    userEthnicity.value
  );
  isUserModalOpen.value = false;
};

const toggleMainExpanded = () => {
  mainExpanded.value = !mainExpanded.value;
};

const success = () => {
  console.log("SUCCESS UPLOAD!!");
};

const failed = () => {
  console.log("FAILED!");
};

const goToPhrase = (index) => {
  phraseCount.value = index;
  phraseSynonymCount.value = null;

  localStorage.setItem("phrases", JSON.stringify(phrases.value));
  localStorage.setItem("count", parseInt(phrases.value[phraseCount.value].count));
  localStorage.setItem("phraseCount", parseInt(phraseCount.value));
  localStorage.setItem("phraseSynonymCount", parseInt(phraseSynonymCount.value));
};

const setPhraseSynonym = (index) => {
  phraseSynonymCount.value = index;
};

const skipPhrase = () => {
  console.log("Skipped successfully!");
  if (phraseCount.value >= phrases.value.length - 1) {
    phraseCount.value = 0;
    finished.value = true;
    localStorage.clear();
  } else {
    phraseCount.value += 1;
    phraseSynonymCount.value = null;
  }

  localStorage.setItem("phrases", JSON.stringify(phrases.value));
  localStorage.setItem("count", parseInt(phrases.value[phraseCount.value].count));
  localStorage.setItem("phraseCount", parseInt(phraseCount.value));
  localStorage.setItem("phraseSynonymCount", parseInt(phraseSynonymCount.value));
};
const nextStep = () => {
  isCompelet.value = false;
};
const sampleAction = async (action) => {
  showPlayer.value = false;
  if (
    action === "approve" &&
    phrases.value[phraseCount.value].count === phrases.value[phraseCount.value].requiredSamples - 1
  ) {
    isCompelet.value = true;
  }
  if (
    action === "approve" &&
    phrases.value[phraseCount.value].count < phrases.value[phraseCount.value].requiredSamples
  ) {
    if (phraseSynonymCount.value === null) {
      phrases.value[phraseCount.value].count += 1;
    } else {
      phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].count += 1;
    }
    await saveSamples().then(() => {
      if (phraseSynonymCount.value === null) {
        phrases.value[phraseCount.value].blob = [];
        phrases.value[phraseCount.value].audio = [];
        phrases.value[phraseCount.value].durations = [];
      } else {
        phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].blob = [];
        phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].audio = [];
        phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].durations = [];
      }
    });
  } else {
    if (phraseSynonymCount.value === null) {
      phrases.value[phraseCount.value].blob.shift();
      phrases.value[phraseCount.value].audio.shift();
      phrases.value[phraseCount.value].durations.shift();
    } else {
      phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].blob.shift();
      phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].audio.shift();
      phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].durations.shift();
    }
  }

  if (phraseSynonymCount.value === null) {
    if (phrases.value[phraseCount.value].count === 10) {
      if (phraseCount.value >= phrases.value.length - 1) {
        phraseCount.value = 0;
        finished.value = true;
        localStorage.clear();
      } else {
        phraseCount.value += 1;
      }
    }
  } else {
    if (phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].count === 10) {
      if (phraseSynonymCount.value >= phrases.value[phraseCount.value].synonyms.length - 1) {
        phraseSynonymCount.value = null;
        phraseCount.value += 1;
      } else {
        phraseSynonymCount.value += 1;
      }
    }
  }

  localStorage.setItem("phrases", JSON.stringify(phrases.value));
  localStorage.setItem("count", parseInt(phrases.value[phraseCount.value].count));
  localStorage.setItem("phraseCount", parseInt(phraseCount.value));
  localStorage.setItem("phraseSynonymCount", parseInt(phraseSynonymCount.value));
};

const afterRec = (blob, audio, duration) => {
  if (phraseSynonymCount.value === null) {
    phrases.value[phraseCount.value].blob.unshift(blob);
    phrases.value[phraseCount.value].audio.unshift(audio);
    phrases.value[phraseCount.value].durations.unshift(duration);
  } else {
    phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].blob.unshift(blob);
    phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].audio.unshift(audio);
    phrases.value[phraseCount.value].synonyms[phraseSynonymCount.value].durations.unshift(duration);
  }

  localStorage.setItem("phrases", JSON.stringify(phrases.value));

  showPlayer.value = true;
};

const customUp = async (blob) => {
  console.log("custom Upload code!");

  try {
    const response = await fetch(backendEndpoint.value, {
      method: "POST",
      body: blob,
    });
    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
</script>

<style scoped>
p {
  margin-bottom: 1.5rem;
}
</style>
