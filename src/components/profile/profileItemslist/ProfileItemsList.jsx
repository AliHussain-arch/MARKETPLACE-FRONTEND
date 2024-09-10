import profileServices from "../../../services/profileServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfileItems = () => {
  const [profiles, setProfiles] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await profileServices.getProfile(userId);
        setProfiles(profileData.profile);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchProfile();
  }, [userId]);

  if (profiles.length === 0) {
    return (
      <>
        <h1>No Profiles Found</h1>
      </>
    );
  }

  return (
    <div className="content">
      <section className="profileitemSection">
        <div className="profileItem"></div>
        <h1>My Items</h1>
        <div>
          {profiles.map((profile) => (
            <div key={profile._id}>
              <p>
                <strong></strong>
                {profile.myItems}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileItems;
