build:
	cp ../storage/s3.py .
	cp ../accuracy_measures/measures.py .
	s2i build . registry.access.redhat.com/ubi8/python-36 quay.io/opendatahub/ai-library-argo-rest-server
.PHONY: build
