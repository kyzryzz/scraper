import cheerio from "cheerio";
import fetch from "node-fetch";

/**
 * SCRAPED BY KAVIAANN
 * FORBIDDEN TO REMOVE WM
 * Follow For More Scrape
 * @link https://kavian.xyz/s/ch
 * @class Ai
 */
class Ai {
  constructor() {
    this.BASE = "https://boredhumans.com";
    this.BASE_URL = this.BASE + "/apis/boredagi_api.php";
    this.BASE_CDN = this.BASE + "/boredagi_files";
    this.BASE_UPLOAD = this.BASE + "/apis/boredagi_upload.php";
    this.uid = {};
    this.sesh_id = {};
    this.tools = {
      celebrity_ai: 10,
      txt2img: 3,
      img_recognition: 6,
      txt2speech: 116,
    };
    this.num = 0;
    this.text = {
      10: "I want to talk to someone famous.",
      3: "Can you generate an image?",
      6: "Describe this image for me.",
      116: "Connect me to Text-To-Speech (TTS) Tool",
    };
  }

  // ? FUNCTION
  #getUid() {
    this.uid[this.num] =
      Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  async #getSeshId() {
    await this.#getUid();
    const res = await fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        "User-Agent": navigator.userAgent,
      },
      body: new URLSearchParams({
        prompt: encodeURIComponent(this.text[this.num]),
        uid: this.uid[this.num],
        sesh_id: "None",
        get_tool: false,
        tool_num: this.num,
      }),
    }).then((v) => v.json());
    if (res.status !== "success") return (this.sesh_id[this.num] = "none");
    return (this.sesh_id[this.num] = res.sesh_id);
  }

  // ? AI
  async celebrityAi(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.celebrity_ai;
        if (!this.sesh_id[this.num]) await this.#getSeshId();
        const data = new URLSearchParams({
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        const res = await fetch(this.BASE_URL, {
          method: "POST",
          headers: {
            "User-Agent": navigator.userAgent,
          },
          body: data,
        }).then((v) => v.json());
        if (res.status !== "success")
          return (async () => {
            await this.#getSeshId();
            await this.celebrityAi(prompt);
          })();
        return resolve(res.output);
      } catch (e) {
        reject(e);
      }
    });
  }

  async txt2img(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.txt2img;
        if (!this.sesh_id[this.num]) await this.#getSeshId();
        const data = {
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        };

        const res = await fetch(this.BASE_URL, {
          method: "POST",
          headers: {
            "User-Agent": navigator.userAgent,
          },
          body: new URLSearchParams(data),
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              data.prompt = "yes";

              return await fetch(this.BASE_URL, {
                method: "POST",
                headers: {
                  "User-Agent": navigator.userAgent,
                },
                body: new URLSearchParams(data),
              }).then((v) => v.json());
            })()
          );

        if (res.status !== "success")
          return (async () => {
            await this.#getSeshId();
            await this.txt2img(prompt);
          })();
        const $ = cheerio.load(res.output);
        await this.#getSeshId();
        return resolve($("img").attr("src"));
      } catch (e) {
        reject(e);
      }
    });
  }

  async imageRecognition(url, prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.img_recognition;
        if (!this.sesh_id[this.num]) await this.#getSeshId();

        const data = new URLSearchParams({
          prompt: encodeURIComponent(url),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        fetch(this.BASE_URL, {
          method: "POST",
          headers: {
            "User-Agent": navigator.userAgent,
          },
          body: data,
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              data.set("prompt", encodeURIComponent(prompt));
              fetch(this.BASE_URL, {
                method: "POST",
                headers: {
                  "User-Agent": navigator.userAgent,
                },
                body: data,
              })
                .then((v) => v.json())
                .then((v) => async () => {
                  await this.#getSeshId();
                  resolve(v.output);
                });
            })()
          );
      } catch (e) {
        reject(e);
      }
    });
  }

  async txt2speech(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.txt2speech;
        if (!this.sesh_id[this.num]) await this.#getSeshId();
        const data = new URLSearchParams({
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        fetch(this.BASE_URL, {
          method: "POST",
          headers: {
            "User-Agent": navigator.userAgent,
          },
          body: data,
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              await this.#getSeshId();
              return resolve(v.output);
            })()
          );
      } catch (e) {
        reject(e);
      }
    });
  }
}

/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
async function stableDiff(prompt, negative = "") {
  return new Promise(async (resolve, reject) => {
    try {
      if (!prompt) return reject("Enter Prompt!");
      const res = await fetch(
        "https://requesteracessibili.joaovitorkas13.workers.dev",
        {
          method: "POST",
          headers: {
            authority: "requesteracessibili.joaovitorkas13.workers.dev",
            "content-type": "application/json",
            origin: "https://just4demo24.blogspot.com",
            referer: "https://just4demo24.blogspot.com/",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({
            prompt: prompt,
            negative_prompt: negative,
            sync_mode: 1,
          }),
        }
      ).then((v) => v.json());

      return resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @param {{
 *  prompt : String,
 * negative : String,
 * style : "(none)"|"Cinematic"|"Photographic"|"Anime"|"Manga"|"Digital Art"|"Pixel art"|"Fantasy art"|"Neonpunk"|"3D Model",
 * sampler : "DDIM"|"Euler a"|"Euler"|"DPM++ 2M Karras"|"DPM++ 2M SDE Karras"|"DPM++ SDE Karras",
 * quality : "(none)"|"Light"|"Standard"|"Heavy",
 * width : Number,
 * height : Number,
 * ratio : "Custom"|"640 x 1536"|"832 x 1216"|"1024 x 1024"|"1152 x 896"|"1344 x 768"|"768 x 1344"|"896 x 1152"|"1216 x 832"|"1536 x 640"
 * }} [options={}]
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
async function animagine(options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        prompt = "Cute Cat",
        negative = "Not Real",
        style = "Anime",
        sampler = "Euler a",
        ratio = "896 x 1152",
        quality = "Standard",
        width = "1024",
        height = "1024",
      } = options;
      const BASE_URL = "https://linaqruf-animagine-xl.hf.space";
      const session_hash = Math.random().toString(36).substring(2);

      // ? Checker
      if (
        !/\(None\)|Cinematic|Photographic|Anime|Manga|Digital Art|Pixel art|Fantasy art|Neonpunk|3D Model/.test(
          style
        )
      )
        style = "Anime";
      if (
        !/DDIM|Euler a|Euler|DPM\+\+ 2M Karras|DPM\+\+ 2M SDE Karras|DPM\+\+ SDE Karras/.test(
          sampler
        )
      )
        sampler = "Euler a";
      if (!/\(none\)|Light|Standard|Heavy/.test(quality)) quality = "Heavy";
      if (
        !/Custom|640 x 1536|832 x 1216|1024 x 1024|1152 x 896|1344 x 768|768 x 1344|896 x 1152|1216 x 832|1536 x 640/.test(
          ratio
        )
      )
        ratio = "896 x 1152";
      if (quality === "Custom")
        async () => {
          if (!width || isNaN(width) || +width > 2048)
            return reject("Enter Valid Image Width Below 2048");
          if (!height || isNaN(height) || +height > 2048)
            return reject("Enter Valid Image Height Below 2048");
        };

      // ? Headers
      const headers = {
        origin: BASE_URL,
        referer: BASE_URL + "/?",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "content-type": "application/json",
      };

      // ? Token
      const { data: token } = await fetch(BASE_URL + "/run/predict", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: [0, true],
          event_data: null,
          fn_index: 4,
          session_hash,
          trigger_id: 6,
        }),
      }).then((v) => v.json());

      // ? Join
      await fetch(BASE_URL + "/queue/join?", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: [
            prompt,
            negative,
            token[0],
            width,
            height,
            7,
            28, // ? Step
            sampler, // ? Sampler
            ratio, // ? Aspect ratio
            style, // ? Style
            quality, // ? Quality
            false,
            0.55,
            1.5,
            true,
          ],
          event_data: null,
          fn_index: 5,
          session_hash,
          trigger_id: 7,
        }),
      }).then((v) => v.json());

      // ? Generate Images
      const stream = await fetch(
        BASE_URL + "/queue/data?" + new URLSearchParams({ session_hash })
      ).then((v) => v.body);

      // ? Handle Stream
      stream.on("data", (v) => {
        const data = JSON.parse(v.toString().split("data: ")[1]);
        if (data.msg !== "process_completed") return;
        if (!data.success) return reject("Image Generation Failed!");
        return resolve(data.output.data[0]);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export { Ai, stableDiff, animagine };
