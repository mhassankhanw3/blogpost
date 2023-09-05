"use client";
import { useState } from "react";
import Layout from "../layout/page";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";

export default function Page() {
  const [conName, setConName] = useState("");
  const [conEmail, setConEmail] = useState("");
  const [conMsg, setConMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    const emailData = {
      to_name: conName,
      from_name: conEmail,
      to_email: "mhassankhanmv@gmail.com",
      message: conMsg,
    };

    emailjs
      .send(
        "service_z9y2f3a",
        "template_8zydjfe",
        emailData,
        "GgHUj00yjUA79hyE-"
      )
      .then(
        (result) => {
          setConName("");
          setConEmail("");
          setConMsg("");
          toast.success("We got your Email !", {
            position: "top-center",
            duration: 4000,
          });
          console.log(result, "result");
          console.log(result.text);
        },
        (error) => {
          console.log(error, "error");
          toast.error("We did not get Your Email", {
            position: "top-center",
            duration: 4000,
          });
        }
      );
    setLoading(false);
  }

  const isPublishButtonDisabled =
    conName.trim() === "" || conEmail.trim() === "" || conMsg.trim() === "";

  // const sendEmail = () => {
  //   let templateParams = {
  //     name: conName,
  //     email: conEmail,
  //     message: conMsg,
  //   };

  //   emailjs
  //     .send("service_3hxhuca", "template_5aqs914", emailData, templateParams)
  //     .then(
  //       function (response) {
  //         console.log("SUCCESS!", response.status, response.text);
  //       },
  //       function (error) {
  //         console.log("FAILED...", error);
  //       }
  //     );
  // };

  return (
    <Layout>
      <main className="flex flex-col mt-24 ">
        <section className="bg-gray-50 max-w-[100%] w-[80%] mx-auto rounded-xl ">
          <div className="mx-auto max-w-screen-xl py-10">
            <div className="mx-auto max-w-2xl">
              <h1 className="text-3xl text-center text-green-700 font-extrabold sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-center text-gray-600 sm:text-xl/relaxed">
                Have questions or feedback? Reach out to us using the form
                below.
              </p>
              <div className="mt-8">
                <form onSubmit={sendEmail} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Your Name
                    </label>
                    <input
                      value={conName}
                      onChange={(e) => setConName(e.target.value)}
                      type="text"
                      className="mt-1 p-2 border rounded placeholder-gray-400 placeholder:text-[14px] w-full transition-all focus:border-green-600 outline-none text-gray-700 "
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Your Email
                    </label>
                    <input
                      value={conEmail}
                      onChange={(e) => setConEmail(e.target.value)}
                      type="email"
                      className="mt-1 p-2 border rounded placeholder-gray-400 placeholder:text-[14px] w-full transition-all focus:border-green-600 outline-none text-gray-700 "
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Message
                    </label>
                    <textarea
                      value={conMsg}
                      onChange={(e) => setConMsg(e.target.value)}
                      className="mt-1 p-2 border rounded placeholder-gray-400 placeholder:text-[14px] w-full h-40 focus:border-green-600 outline-none"
                      placeholder="Write your message"
                    ></textarea>
                  </div>
                  <button
                    className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
                      loading || isPublishButtonDisabled
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    type="submit"
                    disabled={loading || isPublishButtonDisabled}
                  >
                    {loading ? (
                      <span className="custom-loading-button opacity-50">
                        <span className="loader"></span> Loading
                      </span>
                    ) : (
                      "Send Email"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
