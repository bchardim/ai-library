# Duplicate Bug Detection

Duplicate bug detection is used to identify the top matches of existing bugs to a given bug. The model is based on topic modeling of summary or tile information and comments section from bugs. Topics modeled from the bugs are compared using jaccard similarity score to identify existing bugs that resemble closer to the given bug.

## Contents

`duplicate_predict.py` - Identify the top matches of existing bugs to the list of new bugs submitted.
##### Parameters
* bugs - object key containing contents of new bugs (location in the bucket).
* model - object key containing topic models of existing bugs (obtained from duplicate bug detection training).
* resultlocation - location to store results.

## Sample REST call

curl -v http://duplicatepredict-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"model=duplicate_bug_detection/bugs_topics, bugs=duplicate_bug_detection/duplicates, resultlocation=duplicate_bug_detection/result, num_matches=5" }' -H "Content-Type: application/json"

### Sample Data

The following example shows sample s3Path that points to the folder where prediction data is stored.

    bugs - /DH-DEV-DATA/cchase/flake/prediction-data/failures/records
    Files -
	bug_1025857.json
	bug_1037560.json
	bug_1625110.json
	bug_978041.json
        ..

The following example shows what an individual training data looks like. 

	bug_978041.json
	{ "title"  : "Externd glusterfs cinder plugin to use libgapi and QEMU block driver integration", 
 	  "content": "Description of problem: \n BZ 840987 enables storage of live VM images and virtual block store on Red Hat Storage (GlusterFS) volumes with libgfapi and QEMU block driver.\n This offers greater flexibility and better performance in certain kinds of workloads (for example, IO-intensive workloads).\n This BZ requests that the glusterfs cinder plugin be extended to use libgfapi and QEMU block driver."}

## Sample Results

The following example shows sample s3Destination that points to the folder where prediction results are stored.

    resultlocation - duplicate_bug_detection/duplicates
    Files -
        bug_1037560.json
        bug_1025857.json
        bug_1625110.json
        bug_978041.json
        ..

The following example shows what an individual prediction result looks like. Top 5 matches for bug_1037560 are displayed here. Bug 1037560 is actually a duplicate of 1030080.

    bug_1037560.json (thinlvm reports free space of outer VG rather than inner POOL, causing new volumes creation to fail)
    {"0": {"id": "bug_1002648.json", "title": "thinlvm driver fails to create the pool if the outer vg is rounded to the GB"}, 
     "1": {"id": "bug_975916.json", "title": "cinder thinlvm allocates new snap based volumes outside the pool"}, 
     "2": {"id": "bug_1042915.json", "title": "ThinLVM space calculation fails if thin pool LV is not activated"}, 
     "3": {"id": "bug_1083315.json", "title": "ThinLVM attempts to create a cinder volumes pool big as much as cinder volumes and fails"}, 
     "4": {"id": "bug_1030080.json", "title": "Creating thin LVM volume fails due to incorrect thin pool free space calculation"}
    }
