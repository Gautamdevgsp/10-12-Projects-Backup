import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatWithGroq } from "../../../services/groqService";

const travelTypes = ["Family", "Couple", "Friends", "Solo"];
const interestOptions = [
  "Mountains", "Snow", "Adventure", "Nature", "Beach",
  "Wildlife", "Historical Places", "Pilgrimage", "Luxury", "Shopping", "Food",
];

function AiTravelPlanner() {
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [people, setPeople] = useState("");
  const [month, setMonth] = useState("");
  const [travelType, setTravelType] = useState("");
  const [interests, setInterests] = useState([]);
  const [load, setLoad] = useState(false);
  const [response, setResponse] = useState("");
  const [destination, setDestination] = useState("");
  const nav = useNavigate();

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!budget || !duration || !people || !month || !travelType) {
      toast.error("Please fill in all required fields!");
      return;
    }
    if (interests.length === 0) {
      toast.error("Please select at least one interest!");
      return;
    }

    const systemPrompt = `You are an expert Indian Travel Planner.
Recommend only destinations inside India.
Always consider Budget, Duration, Travel Month, Number of Travellers, Travel Type, and Interests.
Generate a complete travel plan.
Always answer in proper Markdown.
The response must contain the following headings:

# Recommended Destination
# Why this destination?
# Suggested Itinerary
Day 1
Day 2
...
# Estimated Budget
| Item | Cost |
| Hotel | ... |
| Food | ... |
| Transportation | ... |
| Activities | ... |
| Miscellaneous | ... |
| **Total** | ... |
# Things to Pack
Bullet list
# Travel Tips
Bullet list

At the end include "Ready to book this trip?"
Do not generate fake hotel names.
Do not generate booking links.
Keep recommendations realistic.`;

    const userPrompt = `Budget: ₹${budget}
Duration: ${duration} Days
Travellers: ${people}
Month: ${month}
Travel Type: ${travelType}
Interests:
${interests.join("\n")}`;

    setLoad(true);
    setResponse("");
    try {
      const result = await chatWithGroq(systemPrompt, userPrompt);
      setResponse(result);

      const destMatch = result.match(/# Recommended Destination\s*\n+\*\*(.+?)\*\*/);
      if (destMatch) {
        setDestination(destMatch[1].trim());
      } else {
        const simpleMatch = result.match(/# Recommended Destination\s*\n+(.+?)(?:\n|$)/);
        if (simpleMatch) {
          setDestination(simpleMatch[1].trim());
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to generate travel plan. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  const handleBookPackage = () => {
    if (destination) {
      nav(`/packages?destination=${encodeURIComponent(destination)}`);
    } else {
      nav("/packages");
    }
  };

  return (
    <>
      {load && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
          }}
        >
          <HashLoader size={100} color="#FF4A52" />
        </div>
      )}

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>AI Travel Planner</h3>
          <p>Let AI craft your perfect Indian getaway</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="contact_join">
                <h3 className="text-center">Plan Your Trip</h3>

                <form onSubmit={handleGenerate}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="number"
                          placeholder="Budget (₹)"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="number"
                          placeholder="Duration (Days)"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="number"
                          placeholder="Number of People"
                          value={people}
                          onChange={(e) => setPeople(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Travel Month (e.g. December)"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <select
                          className="form-control"
                          value={travelType}
                          onChange={(e) => setTravelType(e.target.value)}
                          style={{ height: "50px" }}
                        >
                          <option value="">Select Travel Type</option>
                          {travelTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 mt-3 mb-3">
                      <label className="mb-2" style={{ fontWeight: 600 }}>
                        Interests
                      </label>
                      <div className="row">
                        {interestOptions.map((interest) => (
                          <div key={interest} className="col-lg-4 col-md-6 col-6 mb-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`interest-${interest}`}
                                checked={interests.includes(interest)}
                                onChange={() => toggleInterest(interest)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`interest-${interest}`}
                              >
                                {interest}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="submit_btn">
                        <button
                          className="boxed-btn4 w-100"
                          type="submit"
                          disabled={load}
                        >
                          {load ? "Generating..." : "✨ Generate Travel Plan"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {response && (
                <div className="contact_join mt-4">
                  <h3 className="text-center">Your Travel Plan</h3>
                  <div className="ai-response">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h4
                            style={{
                              color: "#FF4A52",
                              marginTop: "1.5rem",
                              borderBottom: "2px solid #FF4A52",
                              paddingBottom: "0.5rem",
                            }}
                          >
                            {children}
                          </h4>
                        ),
                        h2: ({ children }) => (
                          <h5
                            style={{
                              color: "#333",
                              marginTop: "1.2rem",
                              fontWeight: 700,
                            }}
                          >
                            {children}
                          </h5>
                        ),
                        h3: ({ children }) => (
                          <h6
                            style={{
                              color: "#555",
                              marginTop: "1rem",
                              fontWeight: 600,
                            }}
                          >
                            {children}
                          </h6>
                        ),
                        table: ({ children }) => (
                          <div className="table-responsive">
                            <table
                              className="table table-bordered"
                              style={{ marginTop: "1rem" }}
                            >
                              {children}
                            </table>
                          </div>
                        ),
                        ul: ({ children }) => (
                          <ul style={{ paddingLeft: "1.5rem", lineHeight: 2 }}>
                            {children}
                          </ul>
                        ),
                        p: ({ children }) => (
                          <p style={{ lineHeight: 1.8, color: "#555" }}>
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong style={{ color: "#333" }}>{children}</strong>
                        ),
                      }}
                    >
                      {response}
                    </ReactMarkdown>

                    {response.includes("Ready to book this trip?") && (
                      <div className="text-center mt-4">
                        <button
                          className="boxed-btn4"
                          onClick={handleBookPackage}
                          style={{ padding: "12px 40px", fontSize: "16px" }}
                        >
                          Book This Package
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AiTravelPlanner;
