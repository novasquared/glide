"use strict";
const SIS_URL = "http://localhost:8000/api/"

const $formNavLinkSection = $("#toc").children().children().children();
const $formSection = $("#glossary");

const formNavLink = `
    <li>
        <a class="reference internal" href="#feedback">Exercise Feedback</a>
    </li>`;
const tokenColin = "e7b6f6a684176be4fba31f98898970c5362b313c";
const tokenJeanne = "ca3f747c52c614e9da43817bcdc665c2dcb0d724";

const formHTML = `
    <div class="section" id="feedback">
    <h2>Exercise Feedback<a class="headerlink" href="#feedback" title="Permalink to this headline">»</a></h2>
        <form id="feedback-form">
        <p>
            <fieldset id="overall-rating" role='radiogroup'>
                <span class="col-3">Overall Rating: </span>
                <span class="star-cb-group">
                    <input type="radio" id="rating-5" name="rating" value="5" aria-labelledby='{5 stars}' >
                    <label for="rating-5">5</label>
                    <input type="radio" id="rating-4" name="rating" value="4" aria-labelledby='{4 stars}' />
                    <label for="rating-4">4</label>
                    <input type="radio" id="rating-3" name="rating" value="3" aria-labelledby='{3 stars}' />
                    <label for="rating-3">3</label>
                    <input type="radio" id="rating-2" name="rating" value="2"  aria-labelledby='{2 stars}'/>
                    <label for="rating-2">2</label>
                    <input type="radio" id="rating-1" name="rating" value="1" aria-labelledby='{1 stars}' />
                    <label for="rating-1">1</label>
                    <input type="radio" id="rating-0" name="rating" value="0" class="star-cb-clear" aria-labelledby='{0 stars}' />
                    <label for="rating-0">0</label>
                </span>
            </fieldset>
        </p>
        <p>
            <fieldset id="instructions-rating">
                <span class="col-3">Instruction Rating: </span>
                <span class="star-cb-group" role='radiogroup'>
                    <input type="radio" id="rating-5" name="instructionRating" value="5" aria-labelledby='{5 stars}' />
                    <label for="instructionRating-5">5</label>
                    <input type="radio" id="instructionRating-4" name="instructionRating" value="4" aria-labelledby='{4 stars}' />
                    <label for="instructionRating-4">4</label>
                    <input type="radio" id="instructionRating-3" name="instructionRating" value="3" aria-labelledby='{3 stars}' />
                    <label for="instructionRating-3">3</label>
                    <input type="radio" id="instructionRating-2" name="instructionRating" value="2" aria-labelledby='{2 stars}' />
                    <label for="instructionRating-2">2</label>
                    <input type="radio" id="instructionRating-1" name="instructionRating" value="1" aria-labelledby='{1 stars}' />
                    <label for="instructionRating-1">1</label>
                    <input type="radio" id="instructionRating-0" name="instructionRating" value="0" class="star-cb-clear" aria-labelledby='{0 stars}' />
                    <label for="instructionRating-0">0</label>
                </span>
            </fieldset>
        </p>
        <p>
            <label for="finished-or-reached-further-study">Finished or reached further study? </label>
            <input type="checkbox" id="finished-or-reached-further-study"
                name="finished-or-reached-further-study"></input>
        </p>
        <p>
            <label for="has_bugs">Were there any bugs in this exercise? </label>
            <input type="checkbox" id="has-bugs" name="has-bugs"></input>
        </p>
        <p>
            <label style="display:block" for="comments">Comments:</label>
            <textarea style="display:block" id="comments" name="comments" placeholder="Enter your comments here"
                rows="4" cols="50"></textarea>
        </p>
        <p>
            <input type="submit" value="Submit Feedback"></input>
        </p>
        </form>
    </div>
    `
$(formNavLink).insertAfter($formNavLinkSection);
$(formHTML).insertAfter($formSection);

// function getStarRating(className) {
//     var starContainer = document.getElementsByClassName(className);
  
//     for(i = 0; i < starContainer.children.length; i++) {
        
//         if(starContainer.children[i].checked) {
//             return starContainer.children[i].value
//         }
//     }
// }

const $formId = $("#feedback-form")
const $overallRating = $("#overall-rating");
const $instructionsRating = $("#instructions-rating");
const $finishedOrReachedFurtherStudy = $("#finished-or-reached-further-study");
const $hasBugs = $("#has-bugs");
const $comments = $("#comments");

function handleClick(evt) {
    // check what element is getting targeted (evt.target)
    // change state to checked for element getting targeted
    evt.preventDefault();
    const whichRating = evt.target()

}

async function handleSubmit(evt) {
    evt.preventDefault();
    console.log({ $overallRating });
    const exerciseURL = window.location.pathname;
    const exerciseId = "test-exercise-1";
    const overallRating = $("input[name=rating]:checked").val()
    console.log(overallRating);
    const instructionsRating = $("input[name=instructionRating]:checked").val()
    // const instructionsRating = getStarRating("instructions-rating-stars");
    const finishedOrReachedFurtherStudy = $finishedOrReachedFurtherStudy.val();
    const hasBugs = $hasBugs.val();
    const comments = $comments.val();

    console.log({ overallRating, instructionsRating, finishedOrReachedFurtherStudy, hasBugs, comments });
    const response = await axios({
        url: `${SIS_URL}exercisefeedback/`,
        method: "POST",
        data: {
            "exercise": exerciseId,
            "overall_rating": overallRating,
            "instruction_rating": instructionsRating,
            "finished_or_reached_further_study": finishedOrReachedFurtherStudy,
            "has_bugs": hasBugs,
            "comments": comments
        },
        headers: { Authorization: `Token ${tokenJeanne}` }
    })
    console.log(response);
};

// $overallRating.on("click", handleClick);
// $instructionsRating.on("click", handleClick);
$formId.on("submit", handleSubmit);