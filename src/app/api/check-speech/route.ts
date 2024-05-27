import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const suscriptionKey = process.env.SUSCRIPTION_KEY || "";
const region = process.env.REGION || "eastus";

export async function POST(request: Request) {
    const formData = await request.formData();
    const fileInput = formData.get("file") as File;
    const phase = formData.get("phase") as string;

    const fileBuffer = await fileInput.arrayBuffer();
    const fileB = Buffer.from(fileBuffer);

    const audioConfig = sdk.AudioConfig.fromWavFileInput(fileB);

    const speechConfig = sdk.SpeechConfig.fromSubscription(
        suscriptionKey,
        region
    );

    // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
        phase,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Phoneme,
        true
    );
    pronunciationAssessmentConfig.enableProsodyAssessment = true;

    // setting the recognition language to English.
    const language = "en-US";
    speechConfig.speechRecognitionLanguage = language;

    // create the speech recognizer.
    var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssessmentConfig.applyTo(reco);

    let result: any;

    await reco.recognizeOnceAsync(async (successfulResult) => {
        if (successfulResult.text) {
            const resultado =
                await sdk.PronunciationAssessmentResult.fromResult(
                    successfulResult
                );
            result = resultado;
        } else {
            return Response.json({
                status: "Done",
                success: false,
                result: "Try again!",
            });
        }
    });

    while (result === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    reco.close();

    // const responseSaved = await updateAudioFile(
    //     questionCode,
    //     studentCode,
    //     fileInput
    // );

    return Response.json({
        status: "Done",
        success: true,
        urlAudio: "responseSaved.url",
        result: result,
    });
}
