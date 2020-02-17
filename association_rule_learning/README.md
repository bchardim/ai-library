# Association Rule Learning

Association rule learning is a rule based machine learning method used to identify relation between variables in the form of rules. Such rules are accompanied by measures such as lift, confidence, support and conviction.

# Contents

`associationrule.py` - Model that generates rules and associated metrics for input data.

##### Parameters
* data - location for input data (upon which rules are generated)

# Sample Query

curl -v http://assoc-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"data=association_rule_learning/data.csv"}' -H "Content-Type: application/json"

## Sample Data

Sample data (in spreadsheet format) used in this analysis can be found under 'data' folder. This data is from openstack-neutron team and shows developer and qe response to bugs in terms of time taken to fix bugs and time taken to verify bugs. For demonstration of this model, new data was constructed on developer and qe response timelines (on weekly basis) and then association rule learning model was executed to understand developers and qe response to various timelines.

## Sample Results

Sample results from the rules generated has been shown below,

#### Developer vs Confidence level on whether the developer will be able to fix a high-severity or a urgent priority bug in a week

    TimRozet        1.00
    StevenHillman	0.80
    MikeKolesnik	0.50
    MiguelAngelAjo	0.43
    JohnSchwarz     0.40
    JakubLibosvar	0.36
    JonSchlueter	0.33
    AssafMuller     0.29
    TerryWilson     0.25
    IharHrachyshka  0.21
    anilvenkata     0.17
    BrentEagles     0.17
    NirMagnezi      0.13
    BrianHaley      0.13
    DanielAlvarez   0.07
    SlawekKaplonski	0.07
            
#### Severity of bugs vs Confidence level of QE engineers in verifying fix for the bugs within a week.

    high-Severity	0.68
    urgent-Severity	0.66

#### Severity of bugs vs Confidence level of developers in fixing the bugs in fixing the bug on weekly basis.

    urgent-Severity	1-week	0.31
    high-Severity	1-week	0.18
    high-Severity	2-week	0.10
    high-Severity	3-week	0.11
