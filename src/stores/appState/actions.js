const preparePayload = async (
  samples,
  userAgent,
  ipAddress,
  emailAddress,
  deviceType,
  environmentAttributes,
  userName,
  userEthnicity,
  localSynonymCount
) => {
  if (localSynonymCount === null) {
    return Promise.all(
      samples.map(async (sample) => {
        let audioBlobs =
          sample.blob && sample.blob.length > 0
            ? await Promise.all(sample.blob.map(blobToBase64))
            : [];
        let blobDurations = sample.durations;

        return {
          ...sample,
          blob: audioBlobs,
          durations: blobDurations,
          user_agent: userAgent,
          ip_address: ipAddress,
          email_address: emailAddress,
          device_type: deviceType,
          environment_attributes: environmentAttributes,
          user_name: userName,
          user_ethnicity: userEthnicity,
        };
      })
    );
  } else {
    return Promise.all(
      samples.map(async (sample) => {
        let audioBlobs =
          sample.synonyms[localSynonymCount].blob &&
          sample.synonyms[localSynonymCount].blob.length > 0
            ? await Promise.all(sample.synonyms[localSynonymCount].blob.map(blobToBase64))
            : [];
        let blobDurations = sample.synonyms[localSynonymCount].durations;

        return {
          ...sample.synonyms[localSynonymCount],
          blob: audioBlobs,
          durations: blobDurations,
          user_agent: userAgent,
          ip_address: ipAddress,
          email_address: emailAddress,
          device_type: deviceType,
          environment_attributes: environmentAttributes,
          user_name: userName,
          user_ethnicity: userEthnicity,
        };
      })
    );
  }
};

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default {
  saveUserDetails(emailAddress, deviceType, environmentAttributes, userName, userEthnicity) {
    this.emailAddress = emailAddress;
    this.deviceType = deviceType;
    this.environmentAttributes = environmentAttributes;
    this.userName = userName;
    this.userEthnicity = userEthnicity;

    localStorage.setItem("emailAddress", emailAddress);
    localStorage.setItem("deviceType", deviceType);
    localStorage.setItem("environmentAttributes", environmentAttributes);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEthnicity", userEthnicity);
  },

  async saveSamples() {
    try {
      let filteredPhrases = this.phrases.filter((phrase, index) => index === this.phraseCount);

      console.info("filteredPhrases", filteredPhrases);
      await preparePayload(
        filteredPhrases,
        this.userAgent,
        this.userIpAddress,
        this.emailAddress,
        this.deviceType,
        this.environmentAttributes,
        this.userName,
        this.userEthnicity,
        this.phraseSynonymCount
      ).then(async (payload) => {
        console.info("payload", JSON.stringify(payload));
        const response = await fetch("https://stage.orva.app/api/samples/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const responseData = response;
        console.log("Success:", responseData);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
