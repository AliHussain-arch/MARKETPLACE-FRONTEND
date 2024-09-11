import profileService from "../../../services/profileServices";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProfileForm from "../profileForm/ProfileForm";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const { userId } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [trigger, setTrigger] = useState(false);

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
      setTrigger(!trigger);
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
  }, [userId, trigger]);

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
        <div className="profileList">
          <h1>My Profile</h1>
          <div>
            {profiles.map((profile) => (
              <div key={profile._id}>
                <div className="profileButtons">
                  <Link to={`/user/${userId}/profile/${profile._id}/history`}>
                    <button>View History</button>
                  </Link>
                  <Link to={`/profile/${profile._id}/wishlist`}>
                    <button> My Wishlists</button>
                  </Link>
                </div>
                <div className="profileAddress">
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
                </div>
                <div>
                  <h1>My Items on Sale</h1>
                  <h3>Click to Edit!</h3>
                  <div>
                    {profile.myItems && Array.isArray(profile.myItems) ? (
                      profile.myItems.map((item) => (
                        <Link
                          to={`/user/${userId}/profile/${profile._id}/items/${item._id}`}
                          key={item._id}
                        >
                          <div className="itemCard">
                            <div className="itemHeader">
                              <h1 className="itemName">{item.name}</h1>
                            </div>
                            <div className="itemImage">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p>No Lists Available</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileList;
