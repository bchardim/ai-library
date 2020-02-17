# Matrix Factorization

Hierarchical Poisson Factorization (HPF) based model that provides companion dependencies for your application stack.

## Supported ecosystems:
* Maven

## Contents

`run_scoring.py` - Topic modeling of summary and contents from existing bugs.
##### Parameters
* ecosystem - language that your application is build on.
* packagelist - ; separated list of dependencies your application uses for compile and run time..
* config - path to config file that contains model hyper parameter definition (a sample config.py.template is stored under src)
* model - location where trained model is stored.

## Sample REST call

curl -v http://matrixfactor-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"model=devops/matrix_factorization/ai_models/hpf-insights/maven/scoring, config=devops/matrix_factorization/config.py, ecosystem=maven, packagelist=io.vertx:vertx-core"}' -H "Content-Type: application/json"

## Sample Data

The following example shows the model data required to run prediction. 

    model - devops/matrix_factorization/ai_models/hpf-insights/maven/scoring
    Files -
        feedback_id_dict.json
        feedback_matrix.npz
        item_matrix.npz
        manifest_id_dict.json
        package_id_dict.json
        user_matrix.npz
        
The following is an example of config file that contains model details including hyper parameter definition.

    config - devops/matrix_factorization/config.py
    config.py -
        HPF_SCORING_REGION = "maven"
        
        # Scoring constants
        MAX_COMPANION_REC_COUNT = int("5")
        UNKNOWN_PACKAGES_THRESHOLD = float("0.3")
        
        # Model filepaths
        HPF_output_package_id_dict = "package_id_dict.json"
        HPF_output_manifest_id_dict = "manifest_id_dict.json"
        HPF_output_user_matrix = "user_matrix.npz"
        HPF_output_item_matrix = "item_matrix.npz"
        HPF_output_feedback_matrix = "feedback_matrix.npz"
        HPF_output_feedback_id_dict = "feedback_id_dict.json"
        
        # Model HyperParameters
        a = 0.5
        a_c = 0.5
        c = 0.5
        c_c = 0.5
        K = 13
        b_c = 0.99
        d_c = 0.99
        
        # Feedback constants
        feedback_threshold = 0.5
        USE_FEEDBACK = "True"


## Glossary:
* **Ecosystem**: The language that your application is build on. Example: maven->java, pypi->python, npm->JS
* **Package List**: The list of dependencies your application uses for compile and run time.
* **Application stack**: The combination of ecosystem and package list that makes up your application.
* **Companion Recommendation**: The dependencies that can go along with your existing application stack.
* **Topic List**: The tags and topics/keywords for this package.
* **Missing Packages**: The dependecnies that the recommnder was not trained on(missing from training set)

More details for the feedback is available under Additional Links

## Additional links:
###### * [Build Upon](https://github.com/arindamsarkar93/hcpf)
###### * [Feedback logic](https://github.com/fabric8-analytics/f8a-hpf-insights/wiki/Feedback-Logic)
###### * [PAPER: Scalable Recommendation with Poisson Factorization](https://arxiv.org/abs/1311.1704)
###### * [PAPER: Hierarchical Compound Poisson Factorization](https://arxiv.org/abs/1604.03853)


