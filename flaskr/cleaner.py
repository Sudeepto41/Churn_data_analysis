import numpy as np
import pandas as pd


def cleanData(data_file, omit_column):

    data = pd.DataFrame(pd.read_csv(data_file))
    data = data.drop(omit_column, axis=1)  # omit user defined columns

    # replace whitespaces with NAN
    data = data.replace(r'^\s*$', np.nan, regex=True)
    data = data.dropna()  # drop the NAN values
    data = data.reset_index()[data.columns]  # reset index

    # fix data types of numerical columns.
    for col in data.columns:
        # figuring out which column has linear data points.
        if data[col].nunique() > data.nunique().mean():
            data[col] = data[col].apply(pd.to_numeric)

    return data.to_csv()  # converts omitted column dataframe to csv
