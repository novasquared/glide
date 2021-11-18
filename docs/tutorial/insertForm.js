"use strict";
const SIS_URL = "http://localhost:8000/api/"

const $formNavLinkSection = $("#toc").children().children().children();
const $formSection = $("#glossary");

const formNavLink = `
    <li>
        <a class="reference internal" href="#feedback">Exercise Feedback</a>
    </li>`;

const formHTML = `
    <div class="section" id="feedback">
    <h2>Exercise Feedback<a class="headerlink" href="#feedback" title="Permalink to this headline">»</a></h2>
        <form id="feedback-form">
            <p>
                <label for="overall-rating">Overall Rating: </label>
                <input type="number" id="overall-rating" class="ratings" name="overall-rating" min="1" max="5"></input>
            </p>
            <p>
                <label for="instructions-rating">Instruction Rating: </label>
                <input type="number" id="instructions-rating" class="ratings" name="instructions-rating" min="1"
                    max="5"></input>
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

const $formId = $("#feedback-form")
const $overallRating = $("#overall-rating");
const $instructionsRating = $("#instructions-rating");
const $finishedOrReachedFurtherStudy = $("#finished-or-reached-further-study");
const $hasBugs = $("#has-bugs");
const $comments = $("#comments");


async function handleSubmit(evt) {
    evt.preventDefault();

    console.log({ $overallRating });
    const exerciseURL = window.location.pathname;
    // const exerciseId = exerciseURL.split('/')[3];
    const exerciseId = "test-exercise-1";
    const overallRating = $overallRating.val();
    const instructionsRating = $instructionsRating.val();
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
        headers: { Authorization: `Token e7b6f6a684176be4fba31f98898970c5362b313c` }
    })
    console.log(response);
};

$formId.on("submit", handleSubmit);