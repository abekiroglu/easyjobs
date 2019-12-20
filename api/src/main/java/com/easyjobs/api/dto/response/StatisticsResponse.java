package com.easyjobs.api.dto.response;

public class StatisticsResponse {
    private long userCount;
    private long advertisementCount;
    private long companyCount;

    public long getCompanyCount() {
        return companyCount;
    }

    public void setCompanyCount(long companyCount) {
        this.companyCount = companyCount;
    }

    public long getAdvertisementCount() {
        return advertisementCount;
    }

    public void setAdvertisementCount(long advertisementCount) {
        this.advertisementCount = advertisementCount;
    }

    public long getUserCount() {
        return userCount;
    }

    public void setUserCount(long userCount) {
        this.userCount = userCount;
    }
}
