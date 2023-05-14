import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export async function getServerSieProps (context) {
//   const  req = context.req
//   const  res = context.res

//   return {
//     props: {
//       meetups : DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://Omi:F1sJPxQaSl8LRTTv@cluster0.wykdcuc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
