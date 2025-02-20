export default {
  hasSeenHome: localStorage.getItem("hasSeenHome") || false,
  count: parseInt(localStorage.getItem("count")) || 0,
  phraseCount: parseInt(localStorage.getItem("phraseCount")) || 0,
  phraseSynonymCount: parseInt(localStorage.getItem("phraseSynonymCount")) || null,
  userAgent: localStorage.getItem("userAgent") || null,
  userName: localStorage.getItem("userName") || null,
  userEthnicity: localStorage.getItem("userEthnicity") || "",
  userIpAddress: localStorage.getItem("userIpAddress") || null,
  emailAddress: localStorage.getItem("emailAddress") || null,
  deviceType: localStorage.getItem("deviceType") || "",
  environmentAttributes: localStorage.getItem("environmentAttributes") || "",
  phrases: JSON.parse(localStorage.getItem("phrases")) || [
    {
      text: "HEY ORVA (hay OR-vuh) ",

      count: 0,
      requiredSamples: 5,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "HEY ORVA (hay OR-vuh) ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "OK ORVA (oh-KAY OR-vuh) ",
      count: 0,
      requiredSamples: 5,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "OK ORVA (oh-KAY OR-vuh)  ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "ROOM READY  ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "ROOM READY  ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "WHEELS IN  ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "WHEELS IN  ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "ANAESTHESIA START ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "ANAESTHESIA START ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "PATIENT READY ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "PATIENT READY ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "TIMEOUT ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "TIMEOUT ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "PROCEDURE START ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "PROCEDURE START ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "PROCEDURE END ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "Procedure END ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "READY TO EXIT ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "READY TO EXIT ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "WHEELS OUT ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "WHEELS OUT ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "ROOM CLEAN ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "ROOM CLEAN ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "Advancements in technology improve communication, enabling people from various backgrounds to collaborate effectively. ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "Advancements in technology improve communication, enabling people from various backgrounds to collaborate effectively. ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "Education is the foundation upon which we build our future; it empowers us to achieve our greatest potential. ",
      count: 0,
      requiredSamples: 2,

      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "Education is the foundation upon which we build our future; it empowers us to achieve our greatest potential. ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "Please monitor the patient's vital signs continuously and inform the team of any significant changes immediately. ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "Please monitor the patient's vital signs continuously and inform the team of any significant changes immediately. ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
    {
      text: "Ensure all surgical instruments are accounted for and properly sterilized before commencing the procedure. ",
      count: 0,
      requiredSamples: 2,
      blob: [],
      audio: [],
      durations: [],
      synonyms: [
        {
          text: "Ensure all surgical instruments are accounted for and properly sterilized before commencing the procedure. ",
          count: 0,
          blob: [],
          audio: [],
          durations: [],
          synonyms: [],
        },
      ],
    },
  ],
};
