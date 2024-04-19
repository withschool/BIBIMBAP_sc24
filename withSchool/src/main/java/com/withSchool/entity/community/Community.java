package com.withSchool.entity.community;

import com.withSchool.entity.school.SchoolInformation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "community")
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id", unique = true, nullable = false)
    @Comment("커뮤니티ID")
    private Long communityId;

    @Column(name = "category")
    @Comment("카테고리")
    private String category;

    @Column(name = "community_name", nullable = false)
    @Comment("커뮤니티이름")
    private String communityName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    @Comment("학교ID")
    private SchoolInformation schoolInformation;
}
