import nltk
nltk.data.path.append("/tmp");
nltk.download('stopwords',download_dir='/tmp')
nltk.download('wordnet',download_dir='/tmp')
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import string
import gensim
from gensim import corpora
from gensim.models import TfidfModel

stop = set(stopwords.words('english'))
exclude = set(string.punctuation)
lemma = WordNetLemmatizer()


def clean(doc):
    stop_free = " ".join([i for i in doc.lower().split() if i not in stop])
    punc_free = ''.join(ch for ch in stop_free if ch not in exclude)
    normalized = " ".join(lemma.lemmatize(word) for word in punc_free.split())
    return normalized


def gen_topics(doc_clean, num_topics, num_words, passes):

    dictionary = corpora.Dictionary(doc_clean)
    doc_term_matrix = [dictionary.doc2bow(doc) for doc in doc_clean]
    Lda = gensim.models.ldamodel.LdaModel
    ldamodel = Lda(doc_term_matrix,
                   num_topics=num_topics,
                   id2word=dictionary,
                   passes=passes)
    x = ldamodel.show_topics(num_topics=num_topics,
                             num_words=num_words,
                             formatted=False)
    topics_words = [(tp[0], [wd[0] for wd in tp[1]]) for tp in x]

    # Extract topic words and return
    topics = []
    for topic,words in topics_words:
        topic = " ".join(words)
        topics.append(topic)

    return topics
