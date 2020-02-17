ifndef IMAGETAG
override IMAGETAG = quay.io/opendatahub/ai-library-anomaly-detection-train
endif

build:
	s2i build . registry.access.redhat.com/ubi8/python-36 ${IMAGETAG}
.PHONY: build
