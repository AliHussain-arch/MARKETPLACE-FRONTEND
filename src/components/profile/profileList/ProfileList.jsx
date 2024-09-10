import profileService from "../../../services/profileServices";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProfileForm from "../profileForm/ProfileForm";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const { userId } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(null);

  const handleUpdateProfile = async (formData) => {
    try {
      const updatedProfile = await profileService.updateProfile(
        formData,
        userId
      );
      const updatedProfiles = profiles.map((profile) =>
        profile._id === updatedProfile._id ? updatedProfile : profile
      );
      setProfiles(updatedProfiles);
      setShowUpdateForm(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await profileService.getProfile(userId);

        if (Array.isArray(profileData.profile)) {
          setProfiles(profileData.profile);
        } else if (typeof profileData.profile === "object") {
          setProfiles([profileData.profile]);
        } else {
          console.error("Unexpected profile data format:", profileData.profile);
          setProfiles([]);
        }
      } catch (error) {
        console.log("Error:", error);
        setProfiles([]);
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
      <section className="profileListSection">
        <h1>My Profile</h1>
        <div>
          {profiles.map((profile) => (
            <div key={profile._id}>
              <p>
                <strong>Username: </strong>
                {profile.owner.username}
              </p>
              <p>
                <strong>Address: </strong>
                {profile.address}
              </p>
              {showUpdateForm === profile._id ? (
                <ProfileForm
                  handleUpdateProfile={handleUpdateProfile}
                  profile={profile}
                  setShowUpdateForm={setShowUpdateForm}
                />
              ) : (
                <button onClick={() => setShowUpdateForm(profile._id)}>
                  Update Address
                </button>
              )}
              <h1>My Lists</h1>
              <div>
                {profile.myItems && Array.isArray(profile.myItems) ? (
                  profile.myItems.map((list) => (
                    <div key={list._id}>
                      <p>
                        <strong>List Name: </strong>
                        <Link to={`/user/${userId}/profile/${profile._id}/items/${list._id}`}>{list.name}</Link>
                      </p>
                      <p>
                        <strong>List Price: </strong>
                        {list.price}
                      </p>
                      <p>
                        <strong>List Description: </strong>
                        {list.description}
                      </p>
                      <p>   
                        <strong>List Category: </strong>
                        {list.category}
                      </p>
                      <p>
                        <strong>List Image: </strong>
                        <img src={list.image} alt={list.name} width="100" />
                      </p>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No Lists Available</p>
                )}
              </div>
              <button>
                <Link to={`/user/${userId}/profile/${profile._id}/history`}>
                  View History
                </Link>
              </button>
              <button>
                <Link to={`/profile/${profile._id}/wishlist`}>
                  My Wishlists
                </Link>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileList;
