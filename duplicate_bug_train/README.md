# Duplicate Bug Detection

Duplicate bug detection is used to identify the top matches of existing bugs to a given bug. The model is based on topic modeling of summary or tile information and comments section from bugs. Topics modeled from the bugs are compared using jaccard similarity score to identify existing bugs that resemble closer to the given bug.

## Contents

`duplicate_train.py` - Topic modeling of summary and contents from existing bugs.
##### Parameters
* inputdir - location of a collection of json-formatted objects for training on
* outputdir - location to store topic models of existing bugs (object key including model name).

## Running on OpenShift with Argo
* Argo must be installed on your OpenShift cluster
* Use the template in the tools/ subdirectory to get started 
* Fill-in the values marked with < and > with your details and S3 storage secret information
* Run ```argo submit --watch ./<your template>.yaml```

## Running locally
* ```pip3 install --user -r requirements.txt```
* ```python3 duplicate_train.py -inputdir <location of your input json files> -outputdir <location to store the results>```

## Sample Data

The following example shows sample data that points to the folder where training data is stored.

    data - duplicate_bug_detection/cinder_bugs
    Files -
        bug_992898.json
	    bug_995766.json
	    bug_996048.json
	    bug_998617.json
        ..

The following example shows what an individual training data looks like. 

    bug_998617.json
	{ "title"  : "when using qpid metadata arguments cause volume cloning to fail", 
	  "content": " Description of problem \n\nvolume cloning seems to fail when using qpid if some metadata is passed see the following \n\n cinder create metadata Type Test source volid d1ce1fc3 10fe 475f 9dc4 51261d04c323 1\n ERROR The server has either erred or is incapable of performing the requested operation \n\ninterestingly this does not seem to happen when a new non clone volume is created\n\n\nVersion Release number of selected component if applicable \n\nopenstack cinder 2013 1 3 2 el6ost\n\n\n cinder api log reports some rather long traceback \n\n InternalError Traceback most recent call last \n File quot usr lib python2 6 site packages qpid messaging driver py quot line 511 in dispatch\n self engine dispatch \n File quot usr lib python2 6 site packages qpid messaging driver py quot line 815 in dispatch\n self process ssn \n File quot usr lib python2 6 site packages qpid messaging driver py quot line 1050 in process\n self send snd msg \n File quot usr lib python2 6 site packages qpid messaging driver py quot line 1261 in send\n body enc msg content \n File quot usr lib python2 6 site packages qpid messaging message py quot line 28 in encode\n sc write primitive type x \n File quot usr lib python2 6 site packages qpid codec010 py quot line 73 in write primitive\n getattr self quot write s quot type NAME v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 257 in write map\n sc write string joinfields map self write map elem m keys m values quot quot \n File quot usr lib python2 6 site packages qpid codec010 py quot line 250 in write map elem\n sc write primitive type v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 73 in write primitive\n getattr self quot write s quot type NAME v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 257 in write map\n sc write string joinfields map self write map elem m keys m values quot quot \n File quot usr lib python2 6 site packages qpid codec010 py quot line 250 in write map elem\n sc write primitive type v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 73 in write primitive\n getattr self quot write s quot type NAME v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 257 in write map\n sc write string joinfields map self write map elem m keys m values quot quot \n File quot usr lib python2 6 site packages qpid codec010 py quot line 250 in write map elem\n sc write primitive type v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 73 in write primitive\n getattr self quot write s quot type NAME v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 257 in write map\n sc write string joinfields map self write map elem m keys m values quot quot \n File quot usr lib python2 6 site packages qpid codec010 py quot line 250 in write map elem\n sc write primitive type v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 73 in write primitive\n getattr self quot write s quot type NAME v \n File quot usr lib python2 6 site packages qpid codec010 py quot line 300 in write list\n type self encoding o \n File quot usr lib python2 6 site packages qpid codec010 py quot line 59 in encoding\n raise CodecException quot no encoding for r quot obj \n CodecException no encoding for lt cinder db sqlalchemy models VolumeMetadata object at 0x458e610 gt \n\n\n What s happening here is that jsonutils to primitive is not being called when source volid is present The diference is that source volid skips the scheduler by calling rpcapi cast directly While the schedulare rpcapi serializes volume s specs correctly the direct cast executed when source volid is passed doesn t \n\n a href https github com openstack cinder blob stable grizzly cinder volume api py L260 https github com openstack cinder blob stable grizzly cinder volume api py L260 a \n\nThis doesn t seem to happen in Havana though Most of the code involved in the volume creation was re factored as part of the task flow blueprint which most have fixed this issue \n\n\n After some more digging I think the proposed patch should also go into master although I couldn t replicated the bug there \n\n\n Also fixed in openstack cinder 2013 1 4 1 el6ost via rebase \n\n\n Auto adding gt MODIFIED bugs to beta\n\n\n verified using openstack cinder 2013 2 3 el6ost noarch\n\n\n Since the problem described in this bug report should be\nresolved in a recent advisory it has been closed with a\nresolution of ERRATA \n\nFor information on the advisory and where to find the updated\nfiles follow the link below \n\nIf the solution does not work for you open a new bug report \n\n a href http rhn redhat com errata RHEA 2013 1859 html http rhn redhat com errata RHEA 2013 1859 html a \n\n\n"}

## Sample Results

The following example shows sample s3Destination that points to where the topic models for existing bugs are stored.

    s3Destination - duplicate_bug_detection/bugs_topics
    File -
        bug_984625.json
        bug_984705.json
        bug_985454.json
        ...
        
The following example shows what an individual training data looks like.
        
        bug_984625.json
        { "title": "RFE cannot create a volume under a specific tenant using the keystone default admin user", 
          "content": ["tenant volume image since transfer think doc text owner creating", "user create tenant admin specific think volume assign upstream 1"]
            
        } 
