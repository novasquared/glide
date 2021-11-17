"use strict";
const SIS_URL = "http://localhost:8000/api/"

// function insertForm() {
//     <div>
//         <h2>Exercise Feedback Form</h2>
//         <form>
//             <label for="overall-rating">Overall Rating</label>
//             <input type="number" id="overall-rating" class="ratings" name="overall-rating"
//                 min="1" max="5"></input>
//             <label for="instructions-rating">Instruction Rating</label>
//             <input type="number" id="instructions-ratings" class="ratings" name="instructions-rating"
//                 min="1" max="5"></input>
//             <label for="finished-or-reached-further-study">Finished or reached further study?</label>
//             <input type="checkbox" id="finished-or-reached-further-study"
//                 name="finished-or-reached-further-study"></input>
//             <label for="has_bugs">Were there any bugs in this exercise?</label>
//             <input type="checkbox" id="has_bugs" name="has_bugs"></input>
//             <label for="comments">Comments</label>
//             <textarea id="comments" name="comments" placeholder="Enter your comments here" rows="4" cols="50"></textarea>
//             <input type="submit" value="Submit Feedback"></input>
//         </form>
//     </div>
// }

const $formId = $("#feedback-form")
const $overallRating = $("#instructions-rating");
const $instructionsRating = $("#seeinstructionsd-text");
const $finishedOrReachedFurtherStudy = $("#finished-or-reached-further-study");
const $hasBugs = $("#has-bugs");
const $comments = $("#comments")

async function handleSubmit(evt) {
    evt.preventDefaults();

    const exerciseURL = window.location.pathname;
    // const exerciseId = exerciseURL.split('/')[3];
    const exerciseId = "test-exercise-1";
    const overallRating = $overallRating.val();
    const instructionsRating = $instructionsRating.val();
    const finishedOrReachedFurtherStudy = $finishedOrReachedFurtherStudy.val();
    const hasBugs = $hasBugs.val();
    const comments = $comments.val();
    const response = await axios({
        url: `${SIS_URL}exercisefeedback/`,
        method: "POST",
        data: {
            "exercise":exerciseId, 
            "overall_rating":overallRating, 
            "instruction_rating":instructionsRating, 
            "finished_or_reached_further_study":finishedOrReachedFurtherStudy, 
            "has_bugs":hasBugs, 
            "comments":comments
        }
    })
    console.log(response)
};

$formId.on("submit", handleSubmit);