import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
const NewMeetup = () => {
  const router = useRouter();
  const meetupHandler = async (eneteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(eneteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="Browse a lot of meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={meetupHandler} />;
    </Fragment>
  );
};

export default NewMeetup;
