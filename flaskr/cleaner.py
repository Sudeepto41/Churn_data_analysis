import pandas as pd
from Dora import Dora


def clean(raw_data_file, omit_column):

    rawdata = pd.DataFrame(pd.read_csv(raw_data_file))
    usedata = rawdata.drop(omit_column, axis=1)  # copy of originally file

    c_unique = {}
    for cols in usedata.columns:
        if usedata[cols].dtypes == 'object':
            c_unique[cols] = list(usedata[cols].unique())

    for key in c_unique:
        print("0")
        print(key, ": ", len(c_unique[key]))

    return usedata.to_csv()  # converts cleaned data to csv
