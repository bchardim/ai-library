# Topic Modeling

Topic modeling is used to summarize content from a document or a URL. The model is based on Latent Dirichlet Allocation.
## Contents

`get_topics.py` - LDA based topic model.
##### Parameters
* data - input data (. separated text)

## Sample REST call

curl -v http://topicmodel-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"data=IBM to acquire RedHat. IBM to maintain RedHat strong legacy of opensource innovation. IBM and redhat go in a partnership"}'  -H "Content-Type: application/json"
