import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import '../../assets/styles/AllDigests.css';
import {
    FaRegClock, FaPlusSquare, FaChevronDown, FaEllipsisH, FaChevronLeft, FaSearch, FaPlusCircle,
    FaStar, FaCog, FaGlobe, FaSortAlphaDown, FaEllipsisV, FaTrashAlt, FaInstagram,
    FaYoutube, FaFacebook, FaPodcast, FaArchive
} from 'react-icons/fa';

import {FaXTwitter} from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/dp.png';

function AllDigests() {
    const [darkMode, setDarkMode] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeTab, setActiveTab] = useState('all');
    const [showTooltip, setShowTooltip] = useState(false); // Tooltip state
    const [allChecked, setAllChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [isSearching, setIsSearching] = useState(false); // State for toggling search mode
    const [checked, setChecked] = useState(false); // Local state for the checkbox

    const [digestsData, setDigestsData] = useState([]); // State to hold the fetched data
    const [usersData, setUserData] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // Loading state
    const [favoriteDigests, setFavoriteDigests] = useState([]); // You can create a new state variable to store the list of favorite digests.

    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to access state

    // Extract the email from location.state
    const email = location.state?.email || '';
    console.log("Email from location state:", email);

    let all_digest_count = 0;
    let archive_count = 0;
    let counters = {
        fav_count: 0
    };

    function incrementFavoriteCount() {
        counters.fav_count += 1;
    }

    useEffect(() => {
        const fetchDigestsData = async () => {
            try {
                const response = await fetch('http://localhost:4001/all-digests-profiles');
                const data = await response.json();
                console.log("Fetched data:", data);
    
                const transformedData = data
                    .filter(digest => digest.email === email)
                    .map((digest, index) => ({
                        name: digest.name,
                        digestCreated: digest.digestCreated || ' ',
                        favorite: digest.favorite || false,
                        avatar: digest.avatar,
                        email: digest.email,
                        facebookUrl: digest.facebookUrl,
                        instagramUrl: digest.instagramUrl,
                        xUrl: digest.xUrl,
                        youtubeUrl: digest.youtubeUrl,
                        checked: false,
                        isArchived: digest.isArchived || false,
                    }));
                    console.log("TRANSFORMATIONSSSSSZZZZ:");
                    console.log(transformedData);
                setDigestsData(transformedData);
                setLoading(false);
    
                // Set favorite digests
                const favoriteDigests = transformedData.filter(digest => digest.favorite);
                setFavoriteDigests(favoriteDigests);
            } catch (error) {
                console.error('Error fetching the digests data:', error);
                setLoading(false);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:4001/createuser');
                const data = await response.json();
                console.log("Fetched data:", data);
    
                const transformedData = data
                .filter(user => user.email === email)
                .map((user, index) => ({
                    name: user.name,
                    email: user.email,
                    avatar: `http://localhost:4001/${user.photo}`, // Prepend server URL to the avatar path
                }));
    
                setUserData(transformedData);
                setLoading(false);
    
            } catch (error) {
                console.error('Error fetching the users data:', error);
                setLoading(false);
            }
        };
    
        fetchDigestsData();
        fetchUserData();
    }, [email]);

    const handleViewClick = (user) => {
        navigate('/profile', { state: { user } });
      };
      
    const handleArchive = async (name, email) => {
        const updatedDigests = [...digestsData]; // Create a copy of the digests data
        const digest = updatedDigests.find(d => d.name === name && d.email === email); // Find the digest by name and email
        
        if (!digest) {
            console.error("Digest not found:", name, email);
            return;
        }
    
        // Toggle the archive status
        const newArchiveStatus = !digest.isArchived;
    
        // If archiving, unfavorite the digest first
        if (newArchiveStatus) {
            digest.favorite = false; // Unfavorite before archiving
            setFavoriteDigests(prev => prev.filter(d => d.email !== email || d.name !== name)); // Remove from favorites list
        }
    
        digest.isArchived = newArchiveStatus; // Update the archive status in the state
    
        // Update the UI immediately
        setDigestsData(updatedDigests);
    
        // Call API to update both the archive and favorite status
        try {
            const response = await fetch(`http://localhost:4001/archive/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isArchived: newArchiveStatus, favorite: digest.favorite, name: digest.name }),
            });
    
            if (response.ok) {
                console.log('Archive and favorite status updated successfully');
            } else {
                console.error('Failed to update archive and favorite status');
            }
        } catch (error) {
            console.error('Error sending archive update request:', error);
        }
    };
    
    const handleDelete = async (name, email) => {
        try {
            const url = `http://localhost:4001/all-digests-profiles/deletefunc`;
            console.log(`Attempting to delete user with URL: ${url}`);
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }), // Send data in the body
            });
            
            console.log(response);
    
            if (response.ok) {
                console.log(`User ${name} with email ${email} deleted successfully.`);
                // Handle successful deletion in the frontend (e.g., refresh the list or remove the item from the UI)
                // Update digestsData to remove only the deleted user
                setDigestsData(prevData => prevData.filter(digest => !(digest.name === name && digest.email === email)));
            
                // Update favoriteDigests if the deleted user was a favorite
                setFavoriteDigests(prevFavorites => prevFavorites.filter(favorite => !(favorite.name === name && favorite.email === email)));

            } else {
                console.error(`Failed to delete user ${name} with email ${email}. Response status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting user ${name} with email ${email}:`, error);
        }
    };
    
    const [dropdownVisible, setDropdownVisible] = useState(null); // Track the active dropdown

    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index); // Toggle the dropdown for the clicked row
    };

    // Filter digests based on the active tab ('all' or 'archived')
    const filteredDigests = digestsData.filter(digest =>
        activeTab === 'all' ? !digest.isArchived : digest.isArchived
    );

    const formatDate = (dateString) => {
        // Updated regex to be more flexible with milliseconds and timezones
        const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))?/;
        const matches = dateString.match(regex);
    
        if (matches) {
            const year = matches[1];
            const month = parseInt(matches[2], 10); // Convert month to a number
            const day = matches[3];
    
            // Array of month names
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
            // Format the date as "DD-MMM-YYYY"
            return `${day}-${monthNames[month - 1]}-${year}`;
        }
    
        return null; // Return null if the input is not valid
    };
    const handleFavoriteToggle = async (name, email) => {
        const updatedDigests = [...digestsData]; // Create a copy of the digestsData
        const digest = updatedDigests.find(d => d.name === name && d.email === email); // Find the digest by email
        
        if (!digest) {
            console.error("Digest not found:", name, email);
            return;
        }
    
        const newFavoriteStatus = !digest.favorite; // Toggle the favorite state
        digest.favorite = newFavoriteStatus;
    
        // Update the UI immediately
        setDigestsData(updatedDigests);
        
    
        // Update the favorite digests
        if (newFavoriteStatus) {
            setFavoriteDigests(prev => [...prev, digest]); // Add to favorites
        } else {
            setFavoriteDigests(prev => prev.filter(d => d.email !== email || d.name !== name)); // Remove from favorites
        }
    
        try {
            const response = await fetch(`http://localhost:4001/favorite/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favorite: newFavoriteStatus, name: digest.name }),
            });
    
            if (response.ok) {
                console.log('Favorite status updated successfully');
            } else {
                console.error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error sending favorite update request:', error);
        }
    };

    
    const handleMouseEnter = () => {
        setShowTooltip(true); // Show tooltip on hover
    };

    // const handleRowCheckboxChange = (index) => {
    //     const updatedDigests = digests.map((Digests, i) => {
    //         if (i === index) {
    //             return { ...digest, checked: !digest.checked }; // Toggle the checked state
    //         }
    //         return digest;
    //     });
    //     setDigestsData(updatedDigests); // Update the state with the new array
    // };

    const handleMouseLeave = () => {
        setShowTooltip(false); // Hide tooltip when not hovered
    };

    const handleHeaderCheckboxChange = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
    };

    const handleCreateNewClick = () => {
        alert(email);
        console.log("Email sent from all digests!")
        navigate('/createdigest', { state: { email } });
    };

    const handleIconClick = () => {
        navigate('/signin');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setAllChecked(false); // Uncheck the header checkbox when switching tabs
    };

    const goToProfilePage = () => {
        navigate('/profile'); // Update the path to your profile page
    };

    const handleSearchClick = () => {
        setIsSearching(!isSearching); // Toggle search mode
        setSearchQuery(''); // Reset the search query when search mode is toggled
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query as the user types
    };

    const handleDigestClick = (userId) => {
        navigate(`/profile/${userId}`); // Navigate to the ProfilePage with the userId
    };

    const handleSort = () => {
        // Determine the new sort order
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    
        // Sort the digestsData based on the new sort order
        const sortedData = [...digestsData].sort((a, b) => {
            // Assuming you want to sort by the 'name' property
            if (newSortOrder === 'asc') {
                return a.name.localeCompare(b.name); // Ascending order
            } else {
                return b.name.localeCompare(a.name); // Descending order
            }
        });
    
        // Update the digestsData with the sorted list
        setDigestsData(sortedData);
    };
    

//     const renderOptionsDropdown = (index) => (
//         <div className="options-dropdown">
//         <div className="option-item" onClick={() => {handleDelete(digest.name, digest.email);setDropdownVisible(null);}}>
//             <FaTrashAlt /> Delete
//         </div>
// </div>
//     );

    return (
        <div className={`digest-page ${darkMode ? 'dark' : 'light'}`}>
            <aside className="sidebar">
                <div className="logo-container">
                    <Link to="/signin">
                        <img src={logo} alt="Keep tabs on" className="logo" />
                    </Link>
                </div>
                <nav className="navigation">
    <span className="nav-label">Navigation</span>
    <ul>
        <li className="nav-item">
            <FaRegClock className="nav-icon" />
            <span>All Digests</span>
            <span className="nav-link">
                {/* <span className="digest-count">{all_digest_count}</span> */}
                <span className="digest-count"></span>
            </span>
        </li>
        <li className="nav-item">
            <FaArchive className="nav-icon" />
            <span>Archived Digests</span>
            <span className="nav-link">
                {/* <span className="digest-count">{archive_count}</span> */}
                <span className="digest-count"></span>
            </span>
        </li>
        <li className="nav-item">
            <FaStar className="nav-icon" />
            <span>Favourite Digests</span>
            <span className="nav-link">
                {/* <span className="digest-count">{counters.fav_count}</span> */}
                <span className="digest-count"></span>
            </span>
        </li>
    </ul>
</nav>

                <span className="individual-digests-label">Favorite Digests</span>
<div className="individual-digests">
    {favoriteDigests.length === 0 ? (
        <p>No favorite digests</p>
    ) : (
        favoriteDigests.map((digest, index) => (

            <div key={index} className="digest-user">
                {incrementFavoriteCount()}
                <img src={digest.avatar} alt={digest.name} />
                <span>{digest.name}</span>
            </div>
        ))
    )}
</div>

<footer className="sidebar-footer">
    <div className="user-info">
    {usersData.length > 0 && ( // Ensure there is data before accessing
    <>
        <img
            src={usersData[0].avatar} 
            alt={usersData[0].name} 
            style={{
                width: '25%',
                height: 'auto',
                maxWidth: '30px',
                borderRadius: '50%',
                marginBottom: '1rem',
                border: '1.5px solid #a38ec7',
                objectFit: 'cover',
            }}
        />
        <span style={{ textAlign: 'center', color: '#e6e6fa' }}>{usersData[0].name}</span> {/* Display the name */}
    </>
)}

        <FontAwesomeIcon 
            icon={faSignOut} 
            onClick={handleIconClick} 
            style={{ cursor: 'pointer', marginLeft: '50%' }} // Increase left margin
        />


    </div>
</footer>


            </aside>

            <main className="content">
                <header className="alldigestsheader">
                    {!isSearching ? <h1>All Digests</h1> : (
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Digests..."
                            className="search-input"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    console.log('Search initiated:', searchQuery);
                                    setIsSearching(true);
                                }
                            }}
                        />
                    )}
                    <div className="header-icons">
                        <FaSearch className="icon" onClick={handleSearchClick} />
                        <button className="create-new-button" onClick={() => navigate('/createdigest', { state: { email } })}>
                            <FaPlusCircle className="icon" /> Create new
                        </button>
                    </div>
                </header>

                {/* Display the email here */}
                {/* {email && (
                    <div className="email-display">
                        <p>Signed in with email: {email}</p>
                    </div>
                )} */}

                <section className="digests-section">
                    <div className="tabs-and-actions">
                        <div className="tabs">
                            {/* <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Digests</button> */}
                            {/* <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Digests</button>
                            <button className={`tab ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => handleTabChange('archived')}>Archived</button> */}
                            <div className="social-media-icons">
                                <Link to="/instagram">
                                    <FaInstagram className="social-icon" />
                                </Link>
                                <Link to="/twitter">
                                    <FaXTwitter className="social-icon" />
                                </Link>
                                <Link to="/youtube">
                                    <FaYoutube className="social-icon" />
                                </Link>
                                <Link to="/facebook">
                                    <FaFacebook className="social-icon" />
                                </Link>
                                <Link to="/podcast">
                                    <button className="podcast-button">
                                        <FaPodcast className="podcast-icon" /> Podcast Feeds
                                    </button>
                                </Link>
                            </div>
                            {/* <button className={`tab ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => handleTabChange('archived')}>Archived</button> */}
                        </div>
                        <div className="actions">
                            <button className="sort-button" onClick={handleSort}>
                                <FaSortAlphaDown /> Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                            </button>
                            <div className="bulk-actions-wrapper">
                                <button
                                    className="bulk-actions-button"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <FaEllipsisV /> Bulk Actions
                                </button>
                                {showTooltip && (
                                    <div className="tooltip">
                                        Perform bulk actions like selecting or deleting multiple digests at once.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

    {/* Tab navigation */}
    <div className="tabs">
                    <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Digests</button>
                    <button className={`tab ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => handleTabChange('archived')}>Archived</button>
                </div>

{loading ? (
    <p>Loading...</p>
) : (
    <>
        {/* <table className="digest-table">
            <thead>
                <tr>
                    <th className="align-left">Avatar</th>
                    <th className="align-left">Name</th>
                    <th className="align-left">Favorite</th>
                    <th className="align-left">Actions</th>
                </tr>
            </thead>
        </table> */}

<div className="digest-list">
    {filteredDigests.map((digest, index) => (
        <div key={`${digest.name}-${index}`} className="digest-row">
            {/* Digest info */}
            {/* <div className="row-checkbox align-left">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)} // Toggle the checked state directly
                />
            </div> */}
            <div className="row-name digest-user align-left">
                <img src={digest.avatar} alt={digest.name} className="digest-avatar" />
                <span>{digest.name}</span>
            </div>

            <div className="row-name digest-user align-left">
                <span>{formatDate(digest.digestCreated)}</span>
            </div>


            {/* Favorite column (Clickable star icon) */}
            {/* Render favorite star only if the digest is not archived */}
            {!digest.isArchived && (
                <div className="row-favorite align-left">
                    <FaStar
                        className="favorite-icon"
                        onClick={() => handleFavoriteToggle(digest.name, digest.email)} // Pass name and email
                        style={{ color: digest.favorite ? 'gold' : 'gray', cursor: 'pointer' }}
                    />
                </div>
            )}

            {/* Favorite and Options */}
            <div className="row-options align-left">
                <FaEllipsisH
                    className="options-icon"
                    onClick={() => toggleDropdown(index)} // Toggle dropdown on click
                />
                {dropdownVisible === index && (
    <div className="options-dropdown">
        {/* Check if the digest is archived */}
        {digest.isArchived ? (
            <div 
                className="option-item" 
                onClick={() => {
                    handleArchive(digest.name, digest.email); // Call the unarchive function
                    setDropdownVisible(null); // Close dropdown after action
                }}>
                Unarchive
            </div>
        ) : (
            <>
                <div 
                    className="option-item" 
                    onClick={() => {
                        console.log('View', digest.name); // View action
                        setDropdownVisible(null); // Close dropdown after action

                        // Navigate to ProfileCard and pass the user data
                        navigate(`/profile/${digest.name}`, { state: { user: digest } });
                    }}
                >
                    View
                </div>

                <div 
                    className="option-item" 
                    onClick={() => {
                        handleDelete(digest.name, digest.email); // Delete action
                        setDropdownVisible(null); // Close dropdown after action
                    }}>
                    Delete
                </div>
                <div 
                    className="option-item" 
                    onClick={() => {
                        handleArchive(digest.name, digest.email); // Call the archive function
                        setDropdownVisible(null); // Close dropdown after action
                    }}>
                    Archive
                </div>
            </>
        )}
    </div>
)}

            </div>
        </div>
    ))}
</div>

    </>
)}

                  
                </section>

                <footer className="main-footer">
                    <div className="mfooter-left">
                        <FaGlobe /> @Copyright 2024 Jordan Gill
                    </div>
                    {/* <div className="mfooter-right">
                        <button className="settings-button" onClick={goToProfilePage}>
                            <FaCog className="footer-icon" />
                        </button>
                    </div> */}
                </footer>
            </main>
        </div>
    );
}

export default AllDigests;
